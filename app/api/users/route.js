import { MongoClient } from "mongodb";

export async function GET() {
  try {
    console.log("Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = client.db("secure-marketplace");
    console.log("Using database:", db.databaseName);

    console.log("Fetching users from the 'users' collection...");
    const users = await db.collection("users").find({}).toArray();
    console.log("Fetched users:", users);

    await client.close();
    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}