import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // rethrow so tests fail fast
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

async function mongoClearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export { mongoConnect, mongoDisconnect, mongoClearDatabase };
