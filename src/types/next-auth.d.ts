import "next-auth"

declare module "next-auth"{
    interface User{
        id: string
        email: string
        phone_no: string
    }

    interface Session{
        user: {
            id: string
            email: string
            phone_no: string
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        id: string
        email: string
        phone_no: string
    }
}