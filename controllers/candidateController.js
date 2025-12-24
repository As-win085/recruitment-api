const Candidate = require('../models/Candidate');

exports.createCandidate = async (req, res) => {
    const candidate = new Candidate({ ...req.body, recruiterId: req.user.id });
    await candidate.save();
    res.status(201).json(candidate);
};

exports.getCandidates = async (req, res) => {
    const { skill, minExp } = req.query;
    let query = {};
    if (skill) query.skills = { $in: [skill] };
    if (minExp) query.experienceYears = { $gte: minExp };
    
    const candidates = await Candidate.find(query);
    res.json(candidates);
};

exports.uploadResume = async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    const candidate = await Candidate.findByIdAndUpdate(
        req.params.id, 
        { resumePath: req.file.path }, 
        { new: true }
    );
    res.json(candidate);
};