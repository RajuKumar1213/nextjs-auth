import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return {
                success: false,
                message: "No token found",
            };
        }

        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
        if (!decodedToken) {
            return {
                success: false,
                message: "Invalid token",
            };
        }

        return decodedToken.id;

    } catch (error : any) {
        throw new Error(error.message);
    }
}
