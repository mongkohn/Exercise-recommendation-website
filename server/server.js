const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import user routes
const userRoute = require('./routes/userRoute');
const articleRoute = require('./routes/articleRoute');
const videoRoute = require('./routes/videoRoute');
const commentRoute = require('./routes/commentRoute');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Exercise Recommendation API is running');
});

// Use user routes
app.use('/api/user', userRoute);
app.use("/api/article", articleRoute);
app.use("/api/video", videoRoute);
app.use('/api/comments', commentRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});