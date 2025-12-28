const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    role: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Applied', 'Screened', 'Shortlisted', 'Rejected'], 
        default: 'Applied' 
    },
    score: { type: Number, default: 0 },
    resumeUrl: String,
    experience: Number // in years
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);