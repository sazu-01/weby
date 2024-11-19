

import mongoose from "mongoose";
import { MongodbUrl } from "../../SecretEnv.js";

const ConnectDatabase = async function (options = {}) {
  try {
    const defaultOptions = {
      useNewUrlParser: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,   // Timeout after 5 seconds
      family: 4,                        // Use IPv4, skip trying IPv6
    };
    
    await mongoose.connect(MongodbUrl, { ...defaultOptions, ...options });
    console.log("Connected to Database successfully");

    //Handle connection errors
    mongoose.connection.on("error", function (error) {
      console.error("Database connection error:", error);
    });

    return mongoose.connection;

  } catch (error) {
    console.error("Database connection error:", error);
    // Throw the error to be handled by the caller
    throw error;
  }
};

// Ensure we handle process termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed due to app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
});

export default ConnectDatabase;