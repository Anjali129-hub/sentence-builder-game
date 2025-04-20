const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');  // To make requests to external APIs

const app = express();

// Enable CORS
app.use(cors());

// Define route to fetch questions from an external API (you can replace this URL with your own)
app.get('/questions', async (req, res) => {
  try {
    // Fetching questions from an external API
    const response = await fetch('https://sentence-builder-game-2.onrender.com/questions');
    const data = await response.json();

    // Sending the fetched data as the response
    res.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


