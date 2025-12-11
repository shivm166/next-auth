import UserModel from "@/model/User"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { dbConnect } from "@/lib/dbConnect"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({email: credentials?.email})

                    if(!user){
                        return null
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials?.password || "", user?.password)

                    if(isPasswordCorrect){
                        return user
                    }else{
                        return null
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id
                token.email = user.email
                token.phone_no = user.phone_no
            }
            return token
        },
        async session({session, token}) {
            if(token){
                session.user.id = token.id
                session.user.email = token.email
                session.user.phone_no = token.phone_no
            }
            return session            
        }
        
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}