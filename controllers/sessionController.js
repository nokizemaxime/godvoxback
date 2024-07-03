const { createSession } = require('../services/whatsappService');

const createSessionController = async (req, res) => {
  try {
    await createSession();
    res.send('Session created');
  } catch (error) {
    res.status(500).send('Error creating session');
  }
};

module.exports = {
  createSessionController,
};
