const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
require('dotenv').config();

async function createTestUser() {
    try {
        // Connect to MongoDB
        const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');

        // Check if test user already exists
        const existingUser = await User.findOne({ username: 'testuser' });
        if (existingUser) {
            console.log('Test user already exists');
            console.log('Username:', existingUser.username);
            console.log('Email:', existingUser.email);
            return;
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('password123', saltRounds);

        // Create test user
        const testUser = new User({
            username: 'testuser',
            fullname: 'Test User',
            gender: 'other',
            weight: 70,
            height: 170,
            birthday: new Date('1990-01-01'),
            password: hashedPassword,
            email: 'exerciserecommendation@gmail.com', // Use your email for testing
            tel: '0812345678',
            status: 'activate'
        });

        await testUser.save();
        console.log('Test user created successfully:');
        console.log('Username: testuser');
        console.log('Password: password123');
        console.log('Email: exerciserecommendation@gmail.com');
        
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
createTestUser();
