const express = require('express');
const { createSessionController } = require('../controllers/sessionController');
const router = express.Router();

router.post('/create-session', createSessionController);

module.exports = router;
