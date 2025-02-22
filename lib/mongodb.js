import { MongoClient } from "mongodb";

// Get the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

// Options for the MongoDB client (optional)
const options = {};

// Check if the MongoDB URI is provided
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

// Initialize variables for the client and clientPromise
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client and connect
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the clientPromise to be used in API routes
export default clientPromise;