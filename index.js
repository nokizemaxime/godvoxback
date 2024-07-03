const express = require('express');
const sessionRoutes = require('./routes/sessionRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const { createSession } = require('./services/whatsappService');
const cors = require('cors');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/session', sessionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

createSession().then(() => {
  console.log("session create");
}).catch((error) => {
  console.log('Error creating client:', error);
  process.exit(1);
});
