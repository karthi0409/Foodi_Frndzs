import mongoose from "mongoose";
import 'dotenv/config';

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB } = process.env;

export const connectDB = async () => {
    try {
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log('Database CONNECTED');
    } catch (error) {
        console.error('DB CONNECTION ERROR:', error);
        process.exit(1);
    }
};
