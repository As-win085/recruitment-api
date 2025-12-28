const Candidate = require('../models/Candidate');

exports.scoreCandidate = async (req, res) => {
    try {
        const { score } = req.body;
        const candidate = await Candidate.findByIdAndUpdate(
            req.params.candidateId,
            { 
                score, 
                status: score >= 70 ? 'Shortlisted' : 'Screened' 
            },
            { new: true }
        );
        res.json({ message: "Candidate scored successfully", candidate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getShortlist = async (req, res) => {
    const shortlist = await Candidate.find({ status: 'Shortlisted' }).sort({ score: -1 });
    res.json(shortlist);
};

exports.getPipelineReport = async (req, res) => {
    try {
        const report = await Candidate.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        // Transforms [{_id: 'Applied', count: 5}] into a cleaner format
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};