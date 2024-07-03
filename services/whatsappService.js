const wppconnect = require('@wppconnect-team/wppconnect');

let client;

const createSession = async () => {
  client = await wppconnect.create(
    {
        puppeteerOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: null,
        },
        deviceName: 'GodVox',
    }
  );

  client.onMessage(async (message) => {
    console.log(`Message reçu de ${sessionId}:`, message);
    // await handleMessage(client, message);
    });
  return client;
};

const sendMessage = async (groupId, message) => {
  if (!client) throw new Error('Client not initialized');
  return client.sendText(groupId, message);
};

const sendMedia = async (groupId, filePath, fileType, fileName) => {
  if (!client) throw new Error('Client not initialized');
  switch (fileType) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return client.sendImage(groupId, filePath, fileName);
    case 'mp3':
      return client.sendFile(groupId, filePath);
    case 'mp4':
      return client.sendFile(groupId, filePath);
    default:
      throw new Error('Unsupported file type');
  }
};

const listGroups = async () => {
  if (!client) throw new Error('Client not initialized');
  return client.getAllGroups();
};

module.exports = {
  createSession,
  sendMessage,
  sendMedia,
  listGroups,
};
