import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS Global interface to include our custom mongoose property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Initialize the cached connection object if it's not already defined
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Assign the cached connection back to the global object
global.mongoose = cached;

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB URL");

  // Establish a new connection if no promise exists
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "bitdavai",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
