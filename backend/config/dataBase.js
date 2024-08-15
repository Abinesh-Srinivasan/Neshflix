import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

const { MONGO_URI } = ENV_VARS;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDb connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
