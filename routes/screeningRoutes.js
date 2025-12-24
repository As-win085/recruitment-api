const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();


// Import the authentication middleware
const auth = require('../middleware/auth');

// Import the file upload middleware
const upload = require('../middleware/upload');

// Import the controller functions
const { 
    createCandidate, 
    getCandidates, 
    uploadResume 
} = require('../controllers/candidateController');
// POST /api/screening/:candidateId/score
exports.scoreCandidate = async (req, res) => {
    try {
        const { score } = req.body;
        // Automatic shortlisting if score > 70
        const status = score >= 70 ? 'Shortlisted' : 'Screened';
        
        const candidate = await Candidate.findByIdAndUpdate(
            req.params.candidateId,
            { score, status },
            { new: true }
        );
        res.json({ success: true, candidate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/screening/shortlist
exports.getShortlist = async (req, res) => {
    try {
        const shortlist = await Candidate.find({ status: 'Shortlisted' }).sort({ score: -1 });
        res.json(shortlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/reports/hiring-pipeline
exports.getPipelineReport = async (req, res) => {
    try {
        const report = await Candidate.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = router;