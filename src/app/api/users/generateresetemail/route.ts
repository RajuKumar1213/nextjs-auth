import { sendEmail } from "@/helpers/mailer";
import User from "@/models/user.models";
import { NextRequest , NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {email} = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), {
                status: 400,
            });
        }

        const user = await User.findOne({email});
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }

        sendEmail({
            email,
            emailType: "RESET",
            userId: user._id,
        })

        return NextResponse.json(
            {
                message: "Reset password email sent successfully",
                success: true,
            },
            { status: 200 }
        );

    } catch (error: unknown) {
        let errorMessage = "Error in reset password";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json(
            {
                message: errorMessage,
                success: false,
            },
            { status: 500 }
        );
    }
}
