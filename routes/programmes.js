const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createProgramme, getProgrammes, deleteProgramme } = require('../controllers/programmeController');

const router = express.Router();

router.use(requireAuth);

router.post('/', createProgramme);
router.get('/', getProgrammes);
router.delete('/:id', deleteProgramme);

module.exports = router;