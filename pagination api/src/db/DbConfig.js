import mongoose from "mongoose";

export default async function connectDb(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`Database connection successfully..........`)
    } catch (error) {
        console.log("error in connect database.................")
        console.log(error)
    }
}