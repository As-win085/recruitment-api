const Candidate = require('../models/Candidate');

const getPipelineReport = async (req, res) => {
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

module.exports = {
    getPipelineReport
};