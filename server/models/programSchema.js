const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: [{ type: String }],
  equipment: [{ type: String }],
  muscles: [{ type: String }],
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);