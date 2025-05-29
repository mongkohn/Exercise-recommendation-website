const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a new user
const createUser = async (req, res) => {
  try {
    const { username, fullname, gender, weight, height, birthday, password, email, tel } = req.body;
    
    // Check required fields
    if (!username || !fullname || !gender || !birthday || !password) {
      return res.status(400).json({ message: 'Username, fullname, gender, birthday, and password are required' });
    }

    // Validate gender
    if (!['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({ message: 'Gender must be male, female, or other' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      fullname,
      gender,
      weight: weight || undefined,
      height: height || undefined,
      birthday,
      password: hashedPassword,
      email: email || undefined,
      tel: tel || undefined,
      status: 'activate' // Default status
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      userId: savedUser._id
    });
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(400).json({ message: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ 
      username, 
      status: 'activate' // Only allow active users to login
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        fullname: user.fullname,
        status: user.status
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Mitigate CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    res.json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
      fullname: user.fullname,
      status: user.status
    });
  } catch (err) {
    console.error('Login error:', err); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.create_at;
    
    // Validate gender if provided
    if (updateData.gender && !['male', 'female', 'other'].includes(updateData.gender)) {
      return res.status(400).json({ message: 'Gender must be male, female, or other' });
    }

    // Validate status if provided
    if (updateData.status && !['activate', 'disable'].includes(updateData.status)) {
      return res.status(400).json({ message: 'Status must be activate or disable' });
    }

    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, select: '-password' }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(400).json({ message: err.message });
  }
};

// Delete user by ID (soft delete by setting status to disable)
const deleteUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'disable' },
      { new: true, select: '-password' }
    );
    
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json({ 
      message: 'User deactivated successfully',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Permanently delete user (hard delete)
const permanentDeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User permanently deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check duplicate username/email
const checkDuplicateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    const queries = [];
    if (username) queries.push(User.exists({ username }));
    if (email) queries.push(User.exists({ email }));
    
    const results = await Promise.all(queries);
    
    const response = {};
    if (username) response.usernameExists = !!results[0];
    if (email) response.emailExists = !!results[username ? 1 : 0];
    
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get users by status
const getUsersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    if (!['activate', 'disable'].includes(status)) {
      return res.status(400).json({ message: 'Status must be activate or disable' });
    }
    
    const users = await User.find({ status }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Activate user
const activateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'activate' },
      { new: true, select: '-password' }
    );
    
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      message: 'User activated successfully',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout user
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiry to past date
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Check auth status
const checkAuthStatus = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ isLoggedIn: false, message: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user still exists and is active
    const user = await User.findById(decoded.userId).select('-password');
    if (!user || user.status !== 'activate') {
      return res.status(401).json({ isLoggedIn: false, message: 'User account is not active' });
    }
    
    res.status(200).json({
      isLoggedIn: true,
      userId: decoded.userId,
      username: decoded.username,
      fullname: decoded.fullname,
      status: user.status
    });
  } catch (err) {
    res.status(401).json({ isLoggedIn: false, message: 'Invalid token' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  permanentDeleteUser,
  checkDuplicateUser,
  getUsersByStatus,
  activateUser,
  logoutUser,
  checkAuthStatus
};