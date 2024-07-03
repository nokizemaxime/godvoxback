const express = require('express');
const { sendTextController, sendMediaController } = require('../controllers/messageController');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/send-text', express.json(), sendTextController);
router.post('/send-media', upload.single('file'), sendMediaController);

module.exports = router;
