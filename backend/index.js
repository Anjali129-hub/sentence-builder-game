const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

// Load questions from db.json
const rawData = fs.readFileSync('db.json');
const db = JSON.parse(rawData);

// Define route
app.get('/questions', (req, res) => {
  res.json(db.questions); // assuming db.json has { "questions": [...] }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

