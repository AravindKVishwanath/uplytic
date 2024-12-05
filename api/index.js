const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://aravindkvishwanath59:aravind@uplytic.qajam.mongodb.net/";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

///////////////////////////////////////////////
//////////////////////////////////////////////
// Hardcoded Python questions
const pythonQuestions = [
    {
        question: "What is the correct way to create a variable in Python?",
        options: ["var x = 10", "x <- 10", "x = 10", "int x = 10"],
        correctAnswer: "x = 10",
        subtopic: "Variables",
        explanation: "In Python, variables are created by assigning a value using the = operator. You don’t need to declare the type; Python is dynamically typed.",
    },
    {
        question: "Which of the following is a valid data type in Python?",
        options: ["int", "char", "float", "All of the above"],
        correctAnswer: "All of the above",
        subtopic: "Data Types",
        explanation: "Python supports multiple data types, including int, float, str, and many more. Unlike char in other languages, Python represents characters as strings of length 1.",
    },
    {
        question: "What is the output of print(type(10))?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "Error"],
        correctAnswer: "<class 'int'>",
        subtopic: "Data Types",
        explanation: "The type() function returns the data type of an object. Since 10 is an integer, the output is <class 'int'>.",
    },
    {
        question: "How do you define a function in Python?",
        options: ["function func()", "def func():", "func func()", "func = {}"],
        correctAnswer: "def func():",
        subtopic: "Functions",
        explanation: "Python uses the def keyword to define a function. It is followed by the function name, parentheses, and a colon.",
    },
    {
        question: "What is the correct way to create a list in Python?",
        options: ["list = {}", "list = []", "list = ()", "list = <>"],
        correctAnswer: "list = []",
        subtopic: "Lists",
        explanation: "Lists in Python are defined using square brackets []. They are mutable, ordered collections of items.",
    },
    {
        question: "What is the output of len([1, 2, 3])?",
        options: ["2", "3", "4", "Error"],
        correctAnswer: "3",
        subtopic: "Lists",
        explanation: "The len() function returns the number of items in a list. The list [1, 2, 3] contains three elements.",
    },
    {
        question: "How do you write a conditional statement in Python?",
        options: ["if x > 10:", "if (x > 10):", "if x > 10 then", "if {x > 10}"],
        correctAnswer: "if x > 10:",
        subtopic: "Conditionals",
        explanation: "Python uses the if keyword for conditionals, followed by a condition and a colon. Indentation is used for the block of code under the conditional.",
    },
    {
        question: "Which keyword is used to start a loop in Python?",
        options: ["loop", "for", "iterate", "do"],
        correctAnswer: "for",
        subtopic: "Loops",
        explanation: "The for keyword is used for loops in Python to iterate over sequences like lists, tuples, or ranges.",
    },
    {
        question: "What is the output of 5 // 2 in Python?",
        options: ["2", "2.5", "3", "Error"],
        correctAnswer: "2",
        subtopic: "Operators",
        explanation: "The // operator in Python performs integer (floor) division, which discards the fractional part and returns the largest integer less than or equal to the result.",
    },
    {
        question: "How do you comment a single line in Python?",
        options: ["// This is a comment", "# This is a comment", "/* This is a comment */", "-- This is a comment"],
        correctAnswer: "# This is a comment",
        subtopic: "Comments",
        explanation: "Single-line comments in Python start with the # symbol. Anything after # on the same line is ignored by the interpreter.",
    },
    {
        question: "What does the range(5) function return?",
        options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "(1, 2, 3, 4, 5)", "(0, 1, 2, 3, 4)"],
        correctAnswer: "[0, 1, 2, 3, 4]",
        subtopic: "Loops",
        explanation: "The range(5) function generates a sequence of numbers starting from 0 and ending at 4 (not inclusive of 5).",
    },
    {
        question: "Which of the following is a valid way to handle exceptions in Python?",
        options: ["try...catch", "try...except", "try...finally", "handle...catch"],
        correctAnswer: "try...except",
        subtopic: "Exceptions",
        explanation: "The try block lets you test code for errors, and the except block handles the error if one occurs. Python does not use catch.",
    },
    {
        question: "What is the purpose of __init__ in Python classes?",
        options: ["To create a function", "To initialize a class object", "To define a variable", "None of the above"],
        correctAnswer: "To initialize a class object",
        subtopic: "Classes",
        explanation: "The _init_ method in Python is a constructor. It is called automatically when an object of a class is created to initialize the object's attributes.",
    },
    {
        question: "Which of the following is immutable in Python?",
        options: ["list", "tuple", "dictionary", "set"],
        correctAnswer: "tuple",
        subtopic: "Data Structures",
        explanation: "Tuples are immutable, meaning their elements cannot be changed after creation. Lists, dictionaries, and sets are mutable.",
    },
    {
        question: "What does the open() function do in Python?",
        options: ["Opens a file", "Creates a directory", "Opens a socket", "None of the above"],
        correctAnswer: "Opens a file",
        subtopic: "File Handling",
        explanation: "The open() function is used to open files in Python. It can open files in different modes, such as read (r), write (w), or append (a).",
    },
];

// Endpoint for quiz questions
app.get('/app', (req, res) => {
    res.json(pythonQuestions);
});

// Chatbot logic
app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    const response = pythonQuestions.find(q => userMessage.includes(q.question.toLowerCase()));

    if (response) {
        res.json({ answer: `Question: ${response.question}, Answer: ${response.correctAnswer}`,
        explanation: `Explanation: ${response.explanation}` });
    } else {
        res.json({ answer: "I'm sorry, I can only answer questions based on the provided Python quiz questions." });
    }
});

// Start server
///////////////////////////////////////////////
///////////////////////////////////////////////

// Signup Route
app.post("/signup", async (req, res) => {
  try {
      const { username, email, password, traits } = req.body;

      // Validate input
      if (!username || !email || !password || !traits) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
          username,
          email,
          password: hashedPassword,
          learningStyle: {
              speed: traits[0],
              engagement: traits[1],
              retention: traits[2],
              contentPreference: traits[3],
          },
      });

      // Save to database
      const savedUser = await newUser.save();

      res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


