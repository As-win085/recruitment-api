const Candidate = require('../models/Candidate');

exports.createCandidate = async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).json({ success: true, data: candidate });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /api/candidates (With optional filtering)
exports.getCandidates = async (req, res) => {
  try {
    let query = {};

    // Only filter if role is provided AND not empty
    if (req.query.role && req.query.role.trim() !== "") {
      query.role = req.query.role;
    }

    const candidates = await Candidate
      .find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT /api/candidates/:id
exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, candidate });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// POST /api/candidates/:id/resume
exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Please upload a file" });
        
        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            { resumeUrl: req.file.path }, // Path from Multer
            { new: true }
        );
        res.json({ message: "Resume uploaded successfully", candidate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};