import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { email } = await req.json();
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Generate 4 digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        user.verifyCode = otp;
        user.verifyCodeExpiry = expiryDate;
        await user.save();

        // Email sending logic (Nodemailer) ahiya avshe
        console.log(`OTP for ${email} is: ${otp}`); 

        return NextResponse.json({ success: true, message: "OTP sent to email" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Error sending OTP" }, { status: 500 });
    }
}