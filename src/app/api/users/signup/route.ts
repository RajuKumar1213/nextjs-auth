import connectDb from "@/db/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDb();
    
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(username, email, password);
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });  }
}
