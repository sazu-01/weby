
//module
import dotenv from "dotenv";


// Load the environment variables
dotenv.config();

export const serverPort = process.env.serverPort;

export const MongodbUrl = process.env.MongodbUrl;
