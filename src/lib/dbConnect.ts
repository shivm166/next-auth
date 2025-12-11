import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export async function dbConnect() {
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }

    try {
        // Ensure env variable exists
        if (!process.env.MONGODB_URI) {
            throw new Error("Please define the MONGODB_URI environment variable inside .env");
        }

        const db = await mongoose.connect(process.env.MONGODB_URI)

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected successfully")
    } catch (error) {
        console.error("Database connection failed:", error)
        // Do not use process.exit(1) in Next.js dev mode as it kills the server
    }
}