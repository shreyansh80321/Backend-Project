import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);//making sure we are connected to the mongodburl     . You can console log the connection instance
    
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);//nodejs function used to exit from process
  }
}

export default connectDB;