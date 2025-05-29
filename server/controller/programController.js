const Program = require("../models/programSchema");

// Helper to format program object
const formatProgram = (p) => ({
    id: p.id,
    name: p.name,
    videoUrl: p.videoUrl,
    description: p.description,
    equipment: p.equipment,
    muscles: p.muscles,
    comments: p.comments
});

// Get all programs
const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.json(programs.map(formatProgram));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single program by ID
const getProgramById = async (req, res) => {
    try {
        const p = await Program.findById(req.params.id);
        if (!p) return res.status(404).json({ error: "Program not found" });
        res.json(formatProgram(p));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single program by numeric ID
const getProgramByNumericId = async (req, res) => {
    try {
        const p = await Program.findOne({ id: parseInt(req.params.id) });
        if (!p) return res.status(404).json({ error: "Program not found" });
        res.json(formatProgram(p));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new program
const createProgram = async (req, res) => {
    try {
        const { id, name, videoUrl, description, equipment, muscles } = req.body;
        const program = new Program({ 
            id,
            name, 
            videoUrl,
            description, 
            equipment, 
            muscles
        });
        await program.save();
        res.status(201).json(formatProgram(program));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update program
const updateProgram = async (req, res) => {
    try {
        const { id, name, videoUrl, description, equipment, muscles } = req.body;
        const program = await Program.findByIdAndUpdate(
            req.params.id,
            { id, name, videoUrl, description, equipment, muscles },
            { new: true }
        );
        if (!program) return res.status(404).json({ error: "Program not found" });
        res.json(formatProgram(program));
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
    getProgramByNumericId,
    createProgram,
    updateProgram,
    deleteProgram,
    addComment,
    deleteComment
};
