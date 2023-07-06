import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ConnectMongoDb } from "./mongodb";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

// Connect to MongoDB
ConnectMongoDb();

const app = express();
const port = 5000; // Specify your desired port number here

// Middleware
app.use(cors());
app.use(express.json()); // Parse request bodies as JSON
app.use(express.urlencoded({ extended: true })); // Parse request bodies as URL encoded data

// Routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/users", userRoute); // User routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
