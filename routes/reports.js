const express = require('express');
const router = express.Router();

const { getPipelineReport } = require('../controllers/reportController');

// GET /api/reports/pipeline
router.get('/hiring-pipeline', getPipelineReport);

module.exports = router;