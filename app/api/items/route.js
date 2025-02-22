import { MongoClient } from "mongodb";

export async function GET() {
  try {
    console.log("Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = client.db("secure-marketplace");
    console.log("Using database:", db.databaseName);

    console.log("Fetching items from the 'items' collection...");
    const items = await db.collection("items").find({}).toArray();
    console.log("Fetched items:", items);

    await client.close();
    return Response.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return Response.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}