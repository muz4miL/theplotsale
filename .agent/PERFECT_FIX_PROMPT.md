# Perfect MongoDB Timeout Fix - Prompt for AI Assistant

## Context
We have a Next.js 15 app deployed on Vercel with MongoDB Atlas. After the `/pakistan-projects` page sits idle for 30+ seconds, users get a "Request timed out" error when the page tries to fetch projects from the API.

## Root Cause
The MongoDB connection becomes stale after idle periods, but our `lib/mongodb.js` returns the cached connection without checking if it's still alive. This causes queries to hang until timeout.

## Task
Fix the MongoDB connection timeout issue by implementing proper connection health checks and optimizing timeouts for serverless environments.

## Requirements

### 1. Update `lib/mongodb.js`
Add connection health check and optimize for serverless:

**Changes needed:**
- Check `mongoose.connection.readyState` before returning cached connection
- If connection is not in "connected" state (readyState !== 1), reset cache and reconnect
- Increase `serverSelectionTimeoutMS` from 5s to 10s (for cold starts)
- Increase `socketTimeoutMS` from 10s to 45s (for long-running queries)
- Reduce `maxPoolSize` from 10 to 2 (serverless best practice)
- Add `minPoolSize: 1` (ensure at least 1 connection ready)
- Add `heartbeatFrequencyMS: 10000` (ping every 10s to keep connection alive)
- Add logging for stale connection detection

**Connection States:**
- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting

**Logic:**
```javascript
// Before returning cached.conn, check if it's alive
if (cached.conn) {
  if (mongoose.connection.readyState === 1) {
    return cached.conn; // Connection is healthy
  } else {
    // Connection is stale, reset and reconnect
    console.warn('⚠️ Stale MongoDB connection detected, reconnecting...');
    cached.conn = null;
    cached.promise = null;
  }
}
```

### 2. Update `app/api/projects/route.js`
Increase API timeout to accommodate reconnection time:

**Changes needed:**
- Change timeout from 25000ms (25s) to 40000ms (40s)
- This allows time for: cold start (5s) + reconnection (5s) + query (5s) = 15s with buffer

### 3. Update `app/pakistan-projects/page.jsx`
Increase client-side timeout to match API timeout:

**Changes needed:**
- Change `setTimeout(() => controller.abort(), 30000)` to 45000ms (45s)
- Change emergency timeout from 35000ms to 50000ms (50s)
- This ensures client doesn't abort before API has a chance to reconnect

## Critical Rules

1. **DO NOT change any other logic** - only modify timeouts and add health checks
2. **DO NOT modify the connection string or environment variables**
3. **DO NOT change the query logic in the API routes**
4. **DO NOT modify the UI components or styling**
5. **PRESERVE all existing error handling** - only enhance it
6. **MAINTAIN backward compatibility** - fresh connections should work exactly as before
7. **ADD logging** for debugging (stale connection detection, reconnection attempts)

## Expected Behavior After Fix

### Scenario 1: Fresh Connection (No Change)
- User opens page → Loads in 1-2 seconds ✅
- Works exactly as before

### Scenario 2: Stale Connection (Fixed)
- User opens page → Waits 60 seconds idle
- User refreshes page
- System detects stale connection → Reconnects automatically
- Page loads in 5-10 seconds (acceptable delay)
- No error shown to user ✅

### Scenario 3: Cold Start (Improved)
- Vercel function goes cold (5 min idle)
- User visits page
- Function wakes up + establishes connection
- Page loads in 8-15 seconds (acceptable for cold start)
- No timeout error ✅

## Testing Checklist

After implementing the fix, test:

1. ✅ Fresh page load (should be fast, 1-2s)
2. ✅ Refresh after 60s idle (should reconnect, 5-10s)
3. ✅ Multiple tabs simultaneously (no connection exhaustion)
4. ✅ Cold start after 5 min idle (should work, 8-15s)
5. ✅ Check Vercel logs for "Stale MongoDB connection detected" messages
6. ✅ Verify no errors in browser console

## Files to Modify

1. `lib/mongodb.js` - Connection health check + timeout optimization
2. `app/api/projects/route.js` - Increase API timeout to 40s
3. `app/pakistan-projects/page.jsx` - Increase client timeout to 45s

## Success Criteria

- ✅ No "Request timed out" errors after idle periods
- ✅ Automatic reconnection is transparent to users
- ✅ Fresh connections remain fast (<2s)
- ✅ Stale reconnections complete within 10s
- ✅ No new bugs introduced
- ✅ All existing functionality preserved

## Additional Context

- **MongoDB Atlas**: Free tier (M0) with 500 connection limit
- **Vercel**: Hobby plan with 10s function timeout (may need Pro for 60s)
- **Current behavior**: Works perfectly on fresh connections, fails after idle
- **Serverless nature**: Connections don't persist indefinitely - this is expected
- **Goal**: Make reconnection automatic and transparent

## Code Style

- Use existing code style and formatting
- Maintain existing comments and documentation
- Add new comments for health check logic
- Use console.log/warn for debugging (not console.error unless actual error)

## Deployment

After fixing:
1. Test locally with `npm run dev`
2. Commit with message: "Fix MongoDB connection timeout after idle periods"
3. Push to GitHub
4. Vercel will auto-deploy
5. Test on production after deployment

---

## Summary

Fix the MongoDB timeout issue by:
1. Adding connection health check (readyState validation)
2. Resetting stale connections automatically
3. Increasing timeouts to accommodate reconnection
4. Optimizing connection pool for serverless

This will make the app resilient to idle periods while maintaining fast performance for active users.
