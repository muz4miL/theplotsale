# MongoDB Timeout Issue - Complete Analysis

## Problem Summary
After the `/pakistan-projects` page sits idle for a while, users see:
- **Error**: "Unable to load live projects right now"
- **Message**: "Request timed out"
- **Suggestion**: "verify Vercel environment variables and MongoDB network access"

## Root Cause Analysis

### 1. **Stale Connection Detection Missing**
**File**: `lib/mongodb.js`
**Issue**: The cached connection (`cached.conn`) is never validated before reuse
```javascript
if (cached.conn) {
  return cached.conn;  // ❌ Returns stale connection without checking if it's alive
}
```

**Problem**: 
- MongoDB connections can become stale after idle periods (10-30 seconds)
- Mongoose connection state is not checked before returning cached connection
- Serverless functions wake up with a stale connection reference

### 2. **Aggressive Timeouts**
**File**: `lib/mongodb.js`
```javascript
serverSelectionTimeoutMS: 5000,  // 5s - too short for cold starts
socketTimeoutMS: 10000,           // 10s - can timeout during reconnection
connectTimeoutMS: 10000,          // 10s - can timeout on first connect
```

**Problem**:
- Cold starts in serverless can take 3-5 seconds alone
- MongoDB Atlas free tier can have additional latency
- Total time needed: connection (5s) + query (2-3s) = 7-8s minimum
- Current timeouts don't account for reconnection overhead

### 3. **Client-Side Timeout Race Condition**
**File**: `app/pakistan-projects/page.jsx`
```javascript
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
```

**Problem**:
- Client aborts after 30 seconds
- But API has 25-second timeout
- If API times out at 25s, client still waits 5 more seconds
- User sees "Request timed out" instead of proper error handling

### 4. **No Connection Health Check**
**Missing**: Mongoose connection state validation
```javascript
// Should check: mongoose.connection.readyState
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
```

**Problem**:
- No validation that cached connection is actually usable
- No automatic reconnection on stale connections
- No heartbeat or ping before returning cached connection

### 5. **Connection Pool Not Optimized for Serverless**
**File**: `lib/mongodb.js`
```javascript
maxPoolSize: 10,  // Too high for serverless (each function instance has its own pool)
```

**Problem**:
- Serverless functions are ephemeral
- Each function instance maintains its own connection pool
- 10 connections per instance × multiple instances = connection exhaustion
- MongoDB Atlas free tier: M0 has 500 connection limit
- Recommended: 1-2 connections per serverless function

## Current Flow (Broken)

```
1. User opens /pakistan-projects → Works fine (fresh connection)
2. Page sits idle for 30+ seconds
3. MongoDB connection becomes stale (socket timeout)
4. User interacts with page / page refreshes
5. Client calls /api/projects
6. API calls connectDB()
7. connectDB() returns cached.conn (stale connection) ❌
8. Project.find() tries to use stale connection
9. Query hangs waiting for response
10. API timeout (25s) triggers
11. Client timeout (30s) triggers
12. User sees "Request timed out"
```

## Solution Requirements

### 1. **Add Connection Health Check**
Before returning cached connection, validate it's alive:
```javascript
if (cached.conn && mongoose.connection.readyState === 1) {
  return cached.conn;
}
```

### 2. **Increase Timeouts for Serverless**
```javascript
serverSelectionTimeoutMS: 10000,  // 10s (was 5s)
socketTimeoutMS: 45000,            // 45s (was 10s)
connectTimeoutMS: 10000,           // 10s (keep same)
```

### 3. **Optimize Connection Pool**
```javascript
maxPoolSize: 2,        // Reduced from 10 (serverless best practice)
minPoolSize: 1,        // Ensure at least 1 connection ready
```

### 4. **Add Heartbeat/Ping**
```javascript
heartbeatFrequencyMS: 10000,  // Ping every 10s to keep connection alive
```

### 5. **Reset Stale Connections**
```javascript
if (cached.conn && mongoose.connection.readyState !== 1) {
  console.warn('⚠️ Stale connection detected, reconnecting...');
  cached.conn = null;
  cached.promise = null;
}
```

### 6. **Increase API Timeout**
```javascript
// In app/api/projects/route.js
setTimeout(() => reject(new Error('Database query timeout')), 40000); // 40s (was 25s)
```

### 7. **Align Client Timeout**
```javascript
// In app/pakistan-projects/page.jsx
const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s (was 30s)
```

## Files to Modify

1. **`lib/mongodb.js`** - Add connection health check, increase timeouts, optimize pool
2. **`app/api/projects/route.js`** - Increase API timeout to 40s
3. **`app/pakistan-projects/page.jsx`** - Increase client timeout to 45s

## Testing Plan

1. **Test Fresh Connection**: Open page → Should load immediately
2. **Test Stale Connection**: 
   - Open page → Wait 60 seconds idle
   - Refresh page → Should reconnect and load (may take 5-10s)
3. **Test Cold Start**: 
   - Deploy to Vercel
   - Wait 5 minutes (function goes cold)
   - Visit page → Should load within 15 seconds
4. **Test Concurrent Requests**: 
   - Open multiple tabs
   - All should load without connection exhaustion

## Expected Behavior After Fix

```
1. User opens /pakistan-projects → Works fine (fresh connection)
2. Page sits idle for 30+ seconds
3. MongoDB connection becomes stale
4. User interacts with page / page refreshes
5. Client calls /api/projects
6. API calls connectDB()
7. connectDB() detects stale connection (readyState !== 1) ✅
8. connectDB() resets cache and creates new connection ✅
9. New connection established within 5-10s ✅
10. Project.find() executes successfully ✅
11. Data returned to client ✅
12. User sees projects (may have 5-10s delay on first request after idle) ✅
```

## MongoDB Atlas Configuration (Verify)

Ensure these settings in MongoDB Atlas:
1. **Network Access**: Vercel IP ranges whitelisted (or 0.0.0.0/0 for all)
2. **Database User**: Has read/write permissions
3. **Connection String**: Uses `retryWrites=true&w=majority`
4. **Cluster Tier**: M0 (free) has 500 connection limit - should be sufficient

## Vercel Configuration (Verify)

1. **Environment Variable**: `MONGODB_URI` is set correctly
2. **Function Timeout**: Default 10s (Hobby), 60s (Pro) - may need Pro for reliable performance
3. **Region**: Same region as MongoDB Atlas cluster for lower latency

## Performance Expectations

- **Fresh connection**: 1-2 seconds
- **Cached connection**: <500ms
- **Stale reconnection**: 5-10 seconds (acceptable for idle timeout scenario)
- **Cold start**: 3-5 seconds + connection time = 8-15 seconds total

## Notes

- This is a **normal serverless behavior** - connections don't persist indefinitely
- The fix makes reconnection **transparent and automatic**
- Users may experience a **5-10 second delay** after long idle periods (acceptable)
- Consider upgrading to **Vercel Pro** for 60s function timeout if needed
- Consider upgrading to **MongoDB Atlas M10+** for better connection handling
