const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

// Serve the questions JSON file
const questions = require("./questions.json");
app.get("/questions", (req, res) => {
  res.json(questions);  // Send the questions as JSON
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
