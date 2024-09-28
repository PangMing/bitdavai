import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Define a global type for mongoose connection caching
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Use the declared global type instead of `any`
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "bitdavai",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;

  return cached.conn;
};
