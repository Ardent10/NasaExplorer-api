import mongoose from "mongoose";

const URI = process.env.MONGODB_URI || ""; // Replace with your MongoDB connection string
const DbName = process.env.Db_Name; // Replace with your database name

export async function ConnectMongoDb() {
  try {
    if (!URI) {
      console.log("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(URI, {
      dbName: DbName,
    });

    console.log("Connected successfully to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}
