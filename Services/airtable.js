// services/airtable.js
const axios = require('axios');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

const createAirtableEntry = async (name, phone, service) => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  const data = {
    records: [
      {
        fields: {
          Name: name,
          Phone: phone,
          Service: service,
          Status: 'New' // optional column for kanban
        }
      }
    ]
  };

  await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
};

module.exports = { createAirtableEntry };
