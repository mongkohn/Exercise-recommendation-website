const Program = require("../models/programSchema");

// Get all programs
const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single program by ID
const getProgramById = async (req, res) => {
    try {
        const p = await Program.findById(req.params.id);
        if (!p) return res.status(404).json({ error: "Program not found" });
        res.json(p);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new program
const createProgram = async (req, res) => {
    try {
        const { name, videoUrl, description, equipment, muscles, duration, difficulty, category } = req.body;
        const program = new Program({ 
            name, 
            videoUrl,
            description, 
            equipment, 
            muscles,
            duration,
            difficulty,
            category
        });
        await program.save();
        res.status(201).json(program);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update program
const updateProgram = async (req, res) => {
    try {
        const { name, videoUrl, description, equipment, muscles, duration, difficulty, category } = req.body;
        const program = await Program.findByIdAndUpdate(
            req.params.id,
            { name, videoUrl, description, equipment, muscles, duration, difficulty, category },
            { new: true }
        );
        if (!program) return res.status(404).json({ error: "Program not found" });
        res.json(program);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete program
const deleteProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) return res.status(404).json({ error: "Program not found" });
        res.json({ message: "Program deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a comment to a program
const addComment = async (req, res) => {
    try {
        const { userId, username, text } = req.body;
        if (!userId || !username || !text) {
            return res.status(400).json({ error: "userId, username, and text are required" });
        }
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ error: "Program not found" });
        
        program.comments.push({
            userId,
            username,
            text,
            createdAt: new Date()
        });
        await program.save();
        res.status(201).json({ message: "Comment added", comments: program.comments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a comment from a program
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ error: "Program not found" });
        
        const commentIndex = program.comments.findIndex(
            (c) => c._id.toString() === commentId
        );
        if (commentIndex === -1) {
            return res.status(404).json({ error: "Comment not found" });
        }
          program.comments.splice(commentIndex, 1);
        await program.save();
        res.json({ message: "Comment deleted", comments: program.comments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
    addComment,
    deleteComment
};
