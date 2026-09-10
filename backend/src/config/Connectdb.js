import mongoose from "mongoose";


const Connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/fyp_project`)
        console.log(`Database connected Successfully: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
    }
}

export default Connectdb