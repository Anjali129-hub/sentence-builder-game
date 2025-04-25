const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');  

const app = express();


app.use(cors());


app.get('/questions', async (req, res) => {
  try {
    
    const response = await fetch('https://sentence-builder-game-2.onrender.com/questions');
    const data = await response.json();

    
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


