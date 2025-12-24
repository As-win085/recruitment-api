const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createCandidate, getCandidates, uploadResume } = require('../controllers/candidateController');

router.post('/', auth, createCandidate);
router.get('/', auth, getCandidates);
router.post('/:id/resume', auth, upload.single('resume'), uploadResume);

module.exports = router;