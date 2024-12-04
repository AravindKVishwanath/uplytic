document.addEventListener("DOMContentLoaded", () => {
  // Your entire script code goes here

  // Define the 20 questions
const questions = [
  // Speed-Based
  {
    category: "Speed-Based",
    question: "When learning something new, do you prefer:",
    options: [
      { text: "A concise summary of key points.", subcategory: "Fast" },
      { text: "A balance between details and brevity.", subcategory: "Medium" },
      { text: "Detailed, step-by-step explanations.", subcategory: "Slow" }
    ]
  },
  {
    category: "Speed-Based",
    question: "How do you approach reading a lengthy article or textbook chapter?",
    options: [
      { text: "Skim for main ideas and key takeaways.", subcategory: "Fast" },
      { text: "Read at a steady pace, focusing on important sections.", subcategory: "Medium" },
      { text: "Read every word carefully to fully understand.", subcategory: "Slow" }
    ]
  },
  {
    category: "Speed-Based",
    question: "In a course with deadlines, how do you manage your pace?",
    options: [
      { text: "Finish early and move ahead.", subcategory: "Fast" },
      { text: "Maintain a consistent pace to stay on track.", subcategory: "Medium" },
      { text: "Take time to thoroughly understand each topic.", subcategory: "Slow" }
    ]
  },
  {
    category: "Speed-Based",
    question: "When watching tutorial videos, do you:",
    options: [
      { text: "Prefer increasing playback speed or skipping sections.", subcategory: "Fast" },
      { text: "Watch at normal speed, occasionally pausing for clarity.", subcategory: "Medium" },
      { text: "Frequently pause and rewind to ensure full understanding.", subcategory: "Slow" }
    ]
  },
  {
    category: "Speed-Based",
    question: "How do you prefer to review concepts after learning them?",
    options: [
      { text: "A quick recap or a high-level overview.", subcategory: "Fast" },
      { text: "A mix of high-level and detailed reviews as needed.", subcategory: "Medium" },
      { text: "Detailed, repeated reviews to reinforce understanding.", subcategory: "Slow" }
    ]
  },
  // Engagement-Based
  {
    category: "Engagement-Based",
    question: "Which activity do you find most engaging while learning?",
    options: [
      { text: "Solving hands-on problems or coding challenges.", subcategory: "Active" },
      { text: "Watching a demo or tutorial video.", subcategory: "Passive" },
      { text: "Discussing ideas with peers or joining group activities.", subcategory: "Collaborative" },
      { text: "Studying quietly and independently.", subcategory: "Independent" }
    ]
  },
  {
    category: "Engagement-Based",
    question: "How do you feel about working on group projects?",
    options: [
      { text: "I prefer doing my part and learning by doing.", subcategory: "Active" },
      { text: "I observe how others approach tasks and contribute minimally.", subcategory: "Passive" },
      { text: "I thrive in collaborative environments and enjoy discussions.", subcategory: "Collaborative" },
      { text: "I prefer solo projects to maintain my own pace.", subcategory: "Independent" }
    ]
  },
  {
    category: "Engagement-Based",
    question: "When encountering a new concept, do you:",
    options: [
      { text: "Dive into solving related problems immediately.", subcategory: "Active" },
      { text: "Watch/read explanations and examples first.", subcategory: "Passive" },
      { text: "Talk to others to discuss and understand the topic.", subcategory: "Collaborative" },
      { text: "Study independently at your own pace.", subcategory: "Independent" }
    ]
  },
  {
    category: "Engagement-Based",
    question: "What type of tasks do you enjoy the most?",
    options: [
      { text: "Interactive exercises or simulations.", subcategory: "Active" },
      { text: "Watching demonstrations or reading guides.", subcategory: "Passive" },
      { text: "Brainstorming and learning with others.", subcategory: "Collaborative" },
      { text: "Structured, self-paced activities.", subcategory: "Independent" }
    ]
  },
  {
    category: "Engagement-Based",
    question: "How do you prefer to engage with instructors or mentors?",
    options: [
      { text: "Through practical tasks or hands-on assignments.", subcategory: "Active" },
      { text: "By observing their explanations and examples.", subcategory: "Passive" },
      { text: "In group discussions or brainstorming sessions.", subcategory: "Collaborative" },
      { text: "Through self-guided resources with minimal interaction.", subcategory: "Independent" }
    ]
  },
  // Add Retention Style 
  {
      category: "Retention Style",
      question: "After learning a new topic, how long do you typically retain it?",
      options: [
        { text: "Only for a short time without frequent reinforcement.", subcategory: "Short-Term" },
        { text: "For a moderate time with occasional reviews.", subcategory: "Moderate-Term" },
        { text: "For a long time with minimal review.", subcategory: "Long-Term" }
      ]
    },
    {
      category: "Retention Style",
      question: "How do you ensure you remember information over time?",
      options: [
        { text: "Regularly revisiting and practicing it.", subcategory: "Short-Term" },
        { text: "Using spaced repetition to revisit at intervals.", subcategory: "Moderate-Term" },
        { text: "Reviewing only when it becomes necessary.", subcategory: "Long-Term" }
      ]
    },
    {
      category: "Retention Style",
      question: "What best describes your learning reinforcement needs?",
      options: [
        { text: "Frequent quizzes and reminders to stay on track.", subcategory: "Short-Term" },
        { text: "Periodic reviews and checkpoints.", subcategory: "Moderate-Term" },
        { text: "Occasional summaries to refresh memory.", subcategory: "Long-Term" }
      ]
    },
    {
      category: "Retention Style",
      question: "How do you handle forgetting a previously learned concept?",
      options: [
        { text: "Revisit it in detail multiple times.", subcategory: "Short-Term" },
        { text: "Quickly skim over a summary or key points.", subcategory: "Moderate-Term" },
        { text: "A single review session is enough to recall.", subcategory: "Long-Term" }
      ]
    },
    {
      category: "Retention Style",
      question: "Do you find it easier to recall information when:",
      options: [
        { text: "You revisit it frequently over a short period.", subcategory: "Short-Term" },
        { text: "You apply it periodically in practice.", subcategory: "Moderate-Term" },
        { text: "You have deeply understood it initially.", subcategory: "Long-Term" }
      ]
    },
    {
      category: "Content Preference",
      question: "Which type of material do you prefer for learning?",
      options: [
        { text: "Videos, diagrams, and animations.", subcategory: "Visual" },
        { text: "Written explanations and detailed articles.", subcategory: "Textual" },
        { text: "Interactive tasks and real-world applications.", subcategory: "Kinesthetic" }
      ]
    },
    {
      category: "Content Preference",
      question: "How do you approach a new topic in a course?",
      options: [
        { text: "Watch a video or animation to visualize it.", subcategory: "Visual" },
        { text: "Read a detailed guide or manual for full understanding.", subcategory: "Textual" },
        { text: "Practice it directly through hands-on activities.", subcategory: "Kinesthetic" }
      ]
    },
    {
      category: "Content Preference",
      question: "In a tutorial, what keeps you most engaged?",
      options: [
        { text: "Visually rich content like animations or infographics.", subcategory: "Visual" },
        { text: "Clear, structured written explanations.", subcategory: "Textual" },
        { text: "Interactive tools or simulations.", subcategory: "Kinesthetic" }
      ]
    },
    {
      category: "Content Preference",
      question: "Which type of learning activity do you prefer for problem-solving?",
      options: [
        { text: "Visual examples, diagrams, or step-by-step videos.", subcategory: "Visual" },
        { text: "Written solutions and breakdowns.", subcategory: "Textual" },
        { text: "Solving problems yourself with interactive tools.", subcategory: "Kinesthetic" }
      ]
    },
    {
      category: "Content Preference",
      question: "What best describes your ideal learning experience?",
      options: [
        { text: "Watching a video or visual representation.", subcategory: "Visual" },
        { text: "Reading and analyzing written materials.", subcategory: "Textual" },
        { text: "Doing hands-on experiments or activities.", subcategory: "Kinesthetic" }
      ]
    }     
    
];


// Shuffle the questions array
function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

// Variables to track time and progress
let startTime, questionStartTime, totalDuration, unanswered = [];
let currentQuestionIndex = 0;
const responses = [];

// Start Quiz
function startQuiz() {
  const startButton = document.getElementById("start-button");
  startButton.classList.add("hidden");

  const quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.remove("hidden");

  const shuffledQuestions = shuffleQuestions(questions);
  startTime = new Date();
  showQuestion(shuffledQuestions, currentQuestionIndex);
}

// Show one question at a time
function showQuestion(questions, index) {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  if (index >= questions.length) {
      calculateResults(questions);
      return;
  }

  const question = questions[index];
  questionStartTime = new Date();

  const questionBlock = document.createElement("div");
  questionBlock.classList.add("question-block");
  questionBlock.innerHTML = `
      <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
      ${question.options
          .map(
              (option, i) => `
          <label>
              <input type="radio" name="q${index}" value="${option.subcategory}" />
              ${option.text}
          </label><br />
      `
          )
          .join("")}
  `;

  quizContainer.appendChild(questionBlock);

  // Add event listeners for options
  const options = quizContainer.querySelectorAll("input[type='radio']");
  options.forEach((option) => {
      option.addEventListener("click", () => {
          recordResponse(question, option.value, index);
          showQuestion(questions, ++currentQuestionIndex);
      });
  });
}

// Record the user's response
function recordResponse(question, value, index) {
  const endTime = new Date();
  const timeTaken = (endTime - questionStartTime) / 1000; // in seconds

  responses.push({
      question: question.question,
      category: question.category,
      subcategory: value,
      timeTaken,
  });
}

function calculateResults(questions) {
  const resultContainer = document.getElementById("result-container");
  if (!resultContainer) {
      console.error("Result container element not found.");
      return;
  }

  totalDuration = (new Date() - startTime) / 1000; // in seconds

  // Identify unanswered questions
  questions.forEach((q, index) => {
      if (!responses.find((response) => response.question === q.question)) {
          unanswered.push(index + 1); // Store question number
      }
  });

  // Analyze results
  const answers = {};
  responses.forEach((response) => {
      const { category, subcategory } = response;
      answers[category] = answers[category] || {};
      answers[category][subcategory] = (answers[category][subcategory] || 0) + 1;
  });

  const result = calculateDominantTraits(answers);

  // Display results
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `
      <h3>Your Learning Style:</h3>
      <p>${result.join(" + ")}</p>
      <p><strong>Total Time:</strong> ${totalDuration.toFixed(2)} seconds</p>
  `;

  // Show the signup form
  const signupForm = document.getElementById("signup-form");
  // if (signupForm) {
  //     signupForm.classList.remove("hidden");
  // } else {
  //     console.error("Signup form not found.");
  // }

  // Handle form submission
  signupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form refresh

      // Collect user details
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Send data to the /signup API
      sendSignupRequest({ username, email, password, traits: result });
  });
}


// Function to send data to /signup API
function sendSignupRequest(userData) {
fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to sign up. Please try again.");
        }
    })
    .then((data) => {
        alert("Signup successful! Your results have been saved.");
        console.log("Server Response:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Error during signup: " + error.message);
    });
}

// Calculate dominant traits
function calculateDominantTraits(answers) {
  // Define the categories and their possible traits (subcategories)
  const categories = {
      speed: ["Fast", "Medium", "Slow"],
      engagement: ["Active", "Passive", "Collaborative", "Independent"],
      retention: ["Short-Term", "Moderate-Term", "Long-Term"],
      contentPreference: ["Visual", "Textual", "Kinesthetic"]
  };

  // Initialize the result object with default values
  const result = {
      speed: "unknown",
      engagement: "unknown",
      retention: "unknown",
      contentPreference: "unknown"
  };

  // Mapping for how the categories are labeled in the input data
  const categoryMapping = {
      "Speed-Based": "speed",
      "Engagement-Based": "engagement",
      "Retention Style": "retention",
      "Content Preference": "contentPreference"
  };

  // Iterate through each category and determine the dominant trait
  Object.keys(categoryMapping).forEach((inputCategory) => {
      const category = categoryMapping[inputCategory];  // Get the corresponding category name
      const subcategories = answers[inputCategory];     // Get the subcategory data for the category

      if (subcategories) {
          // Sort the subcategories based on the count or value, and pick the dominant one
          const dominant = Object.entries(subcategories)
              .sort((a, b) => b[1] - a[1])[0][0];  // Get the trait with the highest value

          // Ensure the dominant trait is valid for that category
          if (categories[category].includes(dominant)) {
              result[category] = dominant;  // Set the result with the dominant trait
          } else {
              result[category] = "unknown";  // If the dominant trait is invalid, set it to "unknown"
          }
      } else {
          result[category] = "unknown";  // If no data exists for the category, set to "unknown"
      }
  });

  // Return the result in the predefined order: speed, engagement, retention, contentPreference
  return [result.speed, result.engagement, result.retention, result.contentPreference];
}





// Restart the quiz
function restartQuiz() {
  location.reload();
}

// Event Listener for Start Button
document.getElementById("start-button").addEventListener("click", startQuiz);
});
