// app/api/auth/route.js
import { NextResponse } from "next/server";
import User from "@/models/User"; // Adjust the path to your User model
import bcrypt from "bcrypt";
import { connectDB } from "@/utils/db"; // Utility to connect to MongoDB

// Register a new user
export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { error: "Registration failed", details: error.message },
      { status: 500 }
    );
  }
}