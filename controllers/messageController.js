const { sendMessage, sendMedia } = require('../services/whatsappService');
const fs = require('fs');
const path = require('path');

const sendTextController = async (req, res) => {
  const { groupId, message } = req.body;
  try {
    await sendMessage(groupId, message);
    res.send('Message sent');
  } catch (error) {
    res.status(500).send('Error sending message');
  }
};

const sendMediaController = async (req, res) => {
  const { groupId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = path.resolve(file.path);
  const fileType = path.extname(file.originalname).slice(1);

  try {
    await sendMedia(groupId, filePath, fileType, file.originalname);
    res.send('Media sent');
  } catch (error) {
    res.status(500).send('Error sending media');
  } finally {
    fs.unlinkSync(filePath); // Supprime le fichier temporaire
  }
};

module.exports = {
  sendTextController,
  sendMediaController,
};
