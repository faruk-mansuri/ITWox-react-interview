import mongoose from 'mongoose';

let isConnected = false;

export const connect = async () => {
  if (isConnected) {
    console.log('mongoDB is already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected');
  } catch (error) {
    console.log('failed to connected mongoose database');
    console.log(error);
  }
};
