import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

;(async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not set in environment (.env)');
      process.exit(1);
    }

    // Connect without deprecated options; driver handles defaults now
    await mongoose.connect(mongoUri, {
      // Optional: reduce wait time for connection failures
      serverSelectionTimeoutMS: 5000
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.get('/', (req, res) => {
  res.json({ message: 'World!', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});