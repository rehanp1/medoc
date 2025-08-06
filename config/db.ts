import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/medoc";

const dbConnect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.log("DB Connection Error", error.message);
  }
};

export default dbConnect;
