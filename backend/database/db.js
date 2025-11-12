import mongoose from "mongoose";


 const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/authDB`);
        console.log("Database connected");
    } catch (error) {
        console.log("db error", error);
    }
};


export default connectDB;