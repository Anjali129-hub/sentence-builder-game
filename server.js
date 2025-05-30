const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());


const questions = [
  {
    questionId: "1",
    question:
      "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
    options: ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
    correctAnswer: [
      "User-centric",
      "Incorporated",
      "Enhancing",
      "Cultivating",
    ],
  },
  {
    questionId: "2",
    question:
      "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
    options: ["Captivating", "Eclectic", "Garnering", "Blended"],
    correctAnswer: ["Eclectic", "Blended", "Captivating", "Garnering"],
  },
  {
    questionId: "3",
    question:
      "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
    options: ["Pioneering", "Paving", "Overcoming", "Opened up"],
    correctAnswer: ["Pioneering", "Opened up", "Overcoming", "Paving"],
  },
  {
    questionId: "4",
    question:
      "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
    options: ["Improving", "Reducing", "Enabled", "Revolutionary"],
    correctAnswer: ["Revolutionary", "Enabled", "Improving", "Reducing"],
  },
  {
    questionId: "5",
    question:
      "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
    options: ["Raising", "Massive", "Prompting", "Compromised"],
    correctAnswer: ["Massive", "Compromised", "Raising", "Prompting"],
  },
  {
    questionId: "6",
    question:
      "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
    options: ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
    correctAnswer: ["Comprehensive", "Implemented", "Promoting", "Enhancing"],
  },
  {
    questionId: "7",
    question:
      "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
    options: ["Implemented", "Setting", "Unwavering", "Reducing"],
    correctAnswer: ["Unwavering", "Implemented", "Reducing", "Setting"],
  },
  {
    questionId: "8",
    question:
      "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
    options: ["Opening", "Improved", "Gradual", "Reducing"],
    correctAnswer: ["Gradual", "Improved", "Reducing", "Opening"],
  },
  {
    questionId: "9",
    question:
      "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
    options: ["Providing", "Brought together", "Promoting", "International"],
    correctAnswer: [
      "International",
      "Brought together",
      "Promoting",
      "Providing",
    ],
  },
  {
    questionId: "10",
    question:
      "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
    options: ["Enhancing", "Improved", "Providing", "Widespread"],
    correctAnswer: ["Widespread", "Improved", "Enhancing", "Providing"],
  },
  {
    questionId: "11",
    question:
      "The _____________ strategy _____________ the company's market share, _____________ revenue streams and _____________ customer engagement.",
    options: ["Boosted", "Innovative", "Diversifying", "Elevated"],
    correctAnswer: ["Innovative", "Boosted", "Diversifying", "Elevated"],
  },
  {
    questionId: "12",
    question:
      "The _____________ use of renewable energy _____________ carbon emissions, _____________ environmental health and _____________ a sustainable future.",
    options: ["Ensures", "Enhanced", "Growing", "Reduces"],
    correctAnswer: ["Growing", "Reduces", "Enhanced", "Ensures"],
  },
  {
    questionId: "13",
    question:
      "The _____________ of e-learning platforms _____________ access to education, _____________ learning outcomes and _____________ lifelong learning habits.",
    options: ["Encouraging", "Adoption", "Improving", "Facilitated"],
    correctAnswer: ["Adoption", "Facilitated", "Improving", "Encouraging"],
  },
  {
    questionId: "14",
    question:
      "The _____________ design of the app _____________ user navigation, _____________ user retention and _____________ daily active users.",
    options: ["Intuitive", "Increased", "Simplifies", "Boosting"],
    correctAnswer: ["Intuitive", "Simplifies", "Boosting", "Increased"],
  },
  {
    questionId: "15",
    question:
      "The _____________ shift to remote work _____________ productivity, _____________ work-life balance and _____________ future workplace strategies.",
    options: ["Enabling", "Improved", "Shaping", "Sudden"],
    correctAnswer: ["Sudden", "Improved", "Enabling", "Shaping"],
  },
];


app.get("/questions", (req, res) => {
  res.json(questions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
