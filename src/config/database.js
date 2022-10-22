import mongoose from "mongoose";
import { APIStatus } from "../lib/common";

const MONGO_ATLAS_URL = (username, password) => `mongodb+srv://${username}:${password}@cluster0.dimtq2h.mongodb.net/?retryWrites=true&w=majority`;

const connection = {};
export const connectDB = async () => {
    if(connection.isConnected){
        return;
    }
    try {
        const db = await mongoose.connect(
            MONGO_ATLAS_URL(process.env.DB_USERNAME, process.env.DB_PASSWORD),
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        connection.isConnected = db.connections[0].readyState;
        return {
            status: APIStatus.OK,
            message: "Connected to mongoDB"
        };
    } catch (error) {
        return {
            status: APIStatus.DB_ERROR,
            message:error.message,
            data:[error]
        }
    }
}