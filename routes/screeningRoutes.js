const express = require('express');
const router = express.Router();

const {
  scoreCandidate,
  getShortlistedCandidates
} = require('../controllers/screeningController');

// POST /api/screening/:candidateId/score
router.post('/:candidateId/score', scoreCandidate);

// GET /api/screening/shortlist
router.get('/shortlist', getShortlistedCandidates);

module.exports = router;
