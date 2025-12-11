import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document{
    email: string;
    phone_no: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date
}

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is must be unique"],
    },
    phone_no: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: [true, "Phone Number is must be unique"],
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
    },
    verifyCodeExpiry: {
        type: Date,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel