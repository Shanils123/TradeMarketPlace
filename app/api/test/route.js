// app/api/test/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "Connected to MongoDB" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
}