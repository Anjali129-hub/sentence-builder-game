import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // Correct path to your CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

app.use(cors());

const questions = require("./questions.json"); // Make sure this path is correct
app.get('/questions', (req, res) => {
  res.sendFile(path.join(__dirname, 'questions.json'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
