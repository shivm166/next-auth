import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { email } = await req.json();
        
        // 1. Find User
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // 2. Generate 4 digit OTP (Example)
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry

        // 3. Save to DB
        user.verifyCode = otp;
        user.verifyCodeExpiry = expiryDate;
        await user.save();

        // 4. Send Email (TODO: Implement Nodemailer here)
        console.log(`OTP for ${email} is: ${otp}`); // Testing purpose only

        return NextResponse.json({ success: true, message: "OTP sent to email" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Error sending OTP" }, { status: 500 });
    }
}