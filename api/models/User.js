const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  reference: { type: String, required: true },
  assignment: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  topics: [topicSchema], // Array of topics for the course
});


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    learningStyle: {
      speed: { type: String, enum: ["Fast", "Medium", "Slow"], default: "Medium" },
      engagement: { type: String, enum: ["Active", "Passive", "Collaborative", "Independent"], default: "Passive" },
      retention: { type: String, enum: ["Short-Term", "Moderate-Term", "Long-Term"], default: "Moderate-Term" },
      contentPreference: { type: String, enum: ["Visual", "Textual", "Kinesthetic"], default: "Textual" },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    courses: [courseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
