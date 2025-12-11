import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { signupSchema } from "@/schemas/signupSchema";
import { z } from "zod"

export async function POST(req: NextRequest){
    await dbConnect()

    try {
        
        const data = await  req.json()

        const result = signupSchema.safeParse(data)

        if(!result.success){
            const errors = result.error.flatten()
            console.log(errors)
            return NextResponse.json({
                success: false,
                message: errors
            }, {status: 400})
        }
        console.log(result)
        const existingUserByEmail = await UserModel.findOne({email: result.data.email})

        if(existingUserByEmail){
            return NextResponse.json({
                success: false,
                message: "User Already exist with this email"
            }, {status: 400})
        }

        const existingUserByPhone = await UserModel.findOne({phone_no: result.data.phone_no})

        if(existingUserByPhone){
            return NextResponse.json({
                success: false,
                message: "User Already exist with this Phone Number"
            }, {status: 400})
        }

        const hasedPassword = await bcrypt.hash(result.data.password, 10)

        const createdUser = await UserModel.create({
            email: result.data.email,
            phone_no: result.data.phone_no,
            password: hasedPassword,
        })

        return NextResponse.json({
            success: true,
            message: "User Created Successfully",
            data: {
                user: createdUser,
            }
        }, {status: 201})


    } catch (error) {
        console.log("Error in signup", error)
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, {status:500})
    }
}