const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

let client;

const createSession = async (sessionId) => {
  try {
    client = await wppconnect.create({
      session: sessionId,
      puppeteerOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null,
      },
      deviceName: 'GodVox',
      logQR: true,
    });

    client.onMessage(async (message) => {
      console.log(`Message reçu de ${sessionId}:`, message);
    });

    console.log(`Client WPPConnect démarré pour la session ${sessionId}`);
  } catch (error) {
    console.error('Error creating client:', error);
  }
};

createSession('my-session-id');

app.use(express.json());

app.post('/send-text', async (req, res) => {
  const { groupId, message } = req.body;
  if (!groupId || !message) {
    return res.status(400).send('groupId and message are required');
  }

  try {
    await client.sendText(groupId, message);
    res.send('Message sent');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

app.post('/send-media', upload.single('file'), async (req, res) => {
  const { groupId, caption } = req.body;
  const file = req.file;

  if (!groupId || !file) {
    return res.status(400).send('groupId and file are required');
  }

  const filePath = path.resolve(file.path);
  const fileType = path.extname(file.originalname).slice(1);

  try {
    if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
      await client.sendImage(groupId, filePath, file.originalname, caption);
    } else if (fileType === 'mp3') {
      await client.sendAudio(groupId, filePath);
    } else if (fileType === 'mp4') {
      await client.sendVideo(groupId, filePath, file.originalname, caption);
    } else if (fileType === 'ogg' || fileType === 'opus') {
      await client.sendVoice(groupId, filePath);
    } else {
      return res.status(400).send('Unsupported file type');
    }
    res.send('Media sent');
  } catch (error) {
    console.error('Error sending media:', error);
    res.status(500).send('Error sending media');
  } finally {
    fs.unlinkSync(filePath); // Supprime le fichier temporaire
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
