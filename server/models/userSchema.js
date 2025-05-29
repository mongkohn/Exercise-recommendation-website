const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    weight: { type: Number, required: false }, // in kg
    height: { type: Number, required: false }, // in cm
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: true, sparse: true },
    tel: { type: String, required: false },
    status: { 
        type: String, 
        required: true, 
        enum: ['activate', 'disable'], 
        default: 'activate',
        index: true
    }
}, {
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }
});

module.exports = mongoose.model('User', userSchema);
