import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a cached MongoDB connection for serverless environments
 * @returns {Promise<typeof mongoose>} Mongoose connection instance
 */
async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      'Missing MONGODB_URI. Set it in your environment (.env.local for local, Vercel Project Settings for production).'
    );
  }

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,  // 5s max to pick a server (faster for serverless)
      socketTimeoutMS: 10000,           // 10s socket timeout
      connectTimeoutMS: 10000,          // 10s connection timeout
      maxPoolSize: 10,                  // Connection pool size for serverless
    };

    // Configure Mongoose settings
    mongoose.set('strictQuery', false);

    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      cached.promise = null; // Reset promise on error so next request can retry
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset on failure
    throw e;
  }

  return cached.conn;
}

export default connectDB;
