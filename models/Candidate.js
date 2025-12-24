const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [String],
    experienceYears: { type: Number, default: 0 },
    resumePath: String,
    score: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Applied', 'Screened', 'Shortlisted', 'Rejected'], 
        default: 'Applied' 
    },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);