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

// Ensure `cached` is initialized with the correct type
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Assign the `cached` object to `global.mongoose` for further use
global.mongoose = cached;

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB URL");

  // Initialize the connection promise if it hasn't been set
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "bitdavai",
      bufferCommands: false,
    });

  // Await the promise and store the connection
  cached.conn = await cached.promise;

  return cached.conn;
};
