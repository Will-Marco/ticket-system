import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    console.log('Connecting to DB!');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB!');
  } catch (error) {
    console.log('DB connection error: ' + error);
  }
}
