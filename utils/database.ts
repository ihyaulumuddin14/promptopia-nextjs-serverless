import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

export const connectToDB = async () => {
   mongoose.set('strictQuery', true);

   if (isConnected) {
      console.log('MongoDB is already connected');
      return;
   }

   try {
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log('MongoDB connected successfully');
      isConnected = true;
   } catch (error) {
      mongoose.disconnect();
      console.log('Error connecting to MongoDB:', error);
   }
}