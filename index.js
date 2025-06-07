// index.js main
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { sendTelegramMessage } = require('./services/telegram');
const { createAirtableEntry } = require('./services/airtable');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
  const { name, phone, service } = req.body;
  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendTelegramMessage(name, phone, service);

    if (process.env.AIRTABLE_ENABLED === 'true') {
      await createAirtableEntry(name, phone, service);
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('Error handling submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
