import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB_URI is not defined");
  }

  if (isConnected) {
    return console.log("Already connected to the database");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("Connected to the database");
  } catch (error) {}
};
