import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { email, password } = await req.json();
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        // user.verifyCode = undefined; // Clear the code
        // user.verifyCodeExpiry = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "Password updated" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Error resetting password" }, { status: 500 });
    }
}