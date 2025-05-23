const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing

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
    const { username, email, fullname, gender, birthday, password } = req.body;
    // Check required fields
    if (!username || !email || !fullname || !gender || !birthday || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      fullname,
      gender,
      birthday,
      password: hashedPassword
    });
    const savedUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      userId: savedUser._id
    });
  } catch (err) {
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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.json({ 
      message: 'Login successful', 
      username: user.username, 
      userId: user._id, 
      setIsLogin: true 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
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
    res.status(400).json({ message: err.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check duplicate username/email
const checkDuplicateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const [usernameExists, emailExists] = await Promise.all([
      User.exists({ username }),
      User.exists({ email })
    ]);
    res.status(200).json({
      usernameExists: !!usernameExists,
      emailExists: !!emailExists
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/check', checkDuplicateUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  checkDuplicateUser
};