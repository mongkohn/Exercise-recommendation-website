const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend URL
  credentials: true // Allow credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import user routes
const userRoute = require('./routes/userRoute');
const articleRoute = require('./routes/articleRoute');
const videoRoute = require('./routes/videoRoute');
const commentRoute = require('./routes/commentRoute');
const programRoute = require('./routes/programRoute');
const passwordResetRoute = require('./routes/passwordResetRoutes');

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
app.use('/api/program', programRoute);
app.use('/api/password-reset', passwordResetRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});