import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { email, code } = await req.json();
        
        const user = await UserModel.findOne({ 
            email, 
            verifyCode: code, 
            verifyCodeExpiry: { $gt: Date.now() } 
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid or expired code" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Code verified" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Error verifying code" }, { status: 500 });
    }
}