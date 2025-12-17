import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

interface MongooseConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// @ts-ignore
let cached: MongooseConnection = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env');
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: 'Snaply',
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}
