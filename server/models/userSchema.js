const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
