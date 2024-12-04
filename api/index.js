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


