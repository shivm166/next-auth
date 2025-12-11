import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/mail"; 
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { email } = await req.json();
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const otp = Math.floor(10000 + Math.random() * 9000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        user.verifyCode = otp;
        user.verifyCodeExpiry = expiryDate;
        await user.save();

        const emailResponse = await sendVerificationEmail(email, otp);

        if (!emailResponse.success) {
            return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "OTP sent to email" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Error sending OTP" }, { status: 500 });
    }
}