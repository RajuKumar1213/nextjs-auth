import connectDb from "@/db/dbConfig";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json(
        { messaage: "Please fill all fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        message:
          "Password reset successfully, you can now log in with your new password",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
