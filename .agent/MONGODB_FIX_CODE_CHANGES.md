# MongoDB Timeout Fix - Exact Code Changes

## File 1: `lib/mongodb.js`

### Current Code (Lines 27-30):
```javascript
// Return cached connection if available
if (cached.conn) {
  return cached.conn;
}
```

### Replace With:
```javascript
// Return cached connection if available AND healthy
if (cached.conn) {
  // Check if connection is still alive (readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
  if (mongoose.connection.readyState === 1) {
    return cached.conn;
  } else {
    // Connection is stale, reset and reconnect
    console.warn('⚠️ Stale MongoDB connection detected (readyState:', mongoose.connection.readyState, '), reconnecting...');
    cached.conn = null;
    cached.promise = null;
  }
}
```

### Current Code (Lines 33-38):
```javascript
const opts = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 5000,  // 5s max to pick a server (faster for serverless)
  socketTimeoutMS: 10000,           // 10s socket timeout
  connectTimeoutMS: 10000,          // 10s connection timeout
  maxPoolSize: 10,                  // Connection pool size for serverless
};
```

### Replace With:
```javascript
const opts = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000,  // 10s max to pick a server (increased for cold starts)
  socketTimeoutMS: 45000,            // 45s socket timeout (increased for reconnection)
  connectTimeoutMS: 10000,           // 10s connection timeout
  maxPoolSize: 2,                    // Reduced for serverless (each instance has own pool)
  minPoolSize: 1,                    // Ensure at least 1 connection ready
  heartbeatFrequencyMS: 10000,       // Ping every 10s to keep connection alive
};
```

---

## File 2: `app/api/projects/route.js`

### Current Code (Line 12):
```javascript
setTimeout(() => reject(new Error('Database query timeout')), 25000);
```

### Replace With:
```javascript
setTimeout(() => reject(new Error('Database query timeout')), 40000); // Increased to 40s for reconnection time
```

---

## File 3: `app/pakistan-projects/page.jsx`

### Current Code (Line 21):
```javascript
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout for initial DB connection
```

### Replace With:
```javascript
const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout (allows for reconnection)
```

### Current Code (Line 60):
```javascript
const emergencyTimeout = setTimeout(() => {
  console.warn('⏰ EMERGENCY: Forcing loading false after 35s');
  if (isMounted) {
    setLoading(false);
    setError('Request timed out');
  }
}, 35000);
```

### Replace With:
```javascript
const emergencyTimeout = setTimeout(() => {
  console.warn('⏰ EMERGENCY: Forcing loading false after 50s');
  if (isMounted) {
    setLoading(false);
    setError('Request timed out');
  }
}, 50000); // Increased to 50s to match new timeouts
```

---

## Summary of Changes

### `lib/mongodb.js`:
- ✅ Add connection health check (readyState validation)
- ✅ Reset stale connections automatically
- ✅ Increase serverSelectionTimeoutMS: 5s → 10s
- ✅ Increase socketTimeoutMS: 10s → 45s
- ✅ Reduce maxPoolSize: 10 → 2
- ✅ Add minPoolSize: 1
- ✅ Add heartbeatFrequencyMS: 10000

### `app/api/projects/route.js`:
- ✅ Increase timeout: 25s → 40s

### `app/pakistan-projects/page.jsx`:
- ✅ Increase fetch timeout: 30s → 45s
- ✅ Increase emergency timeout: 35s → 50s

---

## Timeout Hierarchy (After Fix)

```
Client Timeout:        45s (fetch abort)
  ↓
API Timeout:           40s (database query timeout)
  ↓
Socket Timeout:        45s (MongoDB socket)
  ↓
Server Selection:      10s (MongoDB server selection)
  ↓
Emergency Timeout:     50s (force exit loading state)
```

This ensures:
1. MongoDB has time to select server (10s)
2. Socket stays open long enough (45s)
3. API can complete query (40s)
4. Client waits for API (45s)
5. Emergency fallback if everything fails (50s)

---

## Testing Commands

### Local Testing:
```bash
# Start dev server
npm run dev

# Test 1: Fresh load
# Open http://localhost:3000/pakistan-projects
# Should load in 1-2 seconds

# Test 2: Stale connection
# Open page, wait 60 seconds, refresh
# Should reconnect and load in 5-10 seconds

# Test 3: Check logs
# Look for "⚠️ Stale MongoDB connection detected" in terminal
```

### Production Testing:
```bash
# After deployment
# 1. Visit https://theplotsale.com/pakistan-projects
# 2. Wait 60 seconds idle
# 3. Refresh page
# 4. Should load without "Request timed out" error
# 5. Check Vercel logs for reconnection messages
```

---

## Rollback Plan (If Issues Occur)

If the fix causes problems, revert these exact changes:

```bash
git log --oneline -5  # Find the commit hash
git revert <commit-hash>  # Revert the changes
git push origin main  # Deploy rollback
```

Or manually revert:
1. Change timeouts back to original values
2. Remove health check logic
3. Restore original connection pool settings
4. Push to GitHub

---

## Expected Logs After Fix

### Successful Reconnection:
```
⚠️ Stale MongoDB connection detected (readyState: 0), reconnecting...
✅ MongoDB connected successfully
```

### Fresh Connection (No Change):
```
✅ MongoDB connected successfully
```

### Timeout (Should Not Happen):
```
❌ MongoDB connection error: [error message]
```

---

## Performance Expectations

| Scenario | Before Fix | After Fix |
|----------|-----------|-----------|
| Fresh load | 1-2s ✅ | 1-2s ✅ |
| After 60s idle | Timeout ❌ | 5-10s ✅ |
| Cold start | Timeout ❌ | 8-15s ✅ |
| Multiple tabs | Works ✅ | Works ✅ |

---

## Notes

- The 5-10 second delay after idle is **acceptable and expected** in serverless
- Users will rarely notice this (only after long idle periods)
- Fresh connections remain fast (<2s)
- This is a **production-ready fix** used by many Next.js + MongoDB apps
- No breaking changes to existing functionality
