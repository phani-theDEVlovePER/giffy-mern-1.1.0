import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();  // to read data in .env file
export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(error){
        console.log("error connection to mongoDB: ", error.message)
        process.exit(1)  // 1 for failure
    }
}