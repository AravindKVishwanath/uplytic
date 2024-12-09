let questions = [];
let subtopicPerformance = {};
let currentIndex = 0;

// Fetch questions from the backend
async function fetchQuestions() {
    try {
        const topic = localStorage.getItem('selectedTopic'); // Replace with user input if necessary
        const response = await fetch('http://localhost:5000/app', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch quiz questions');
        }

        const data = await response.json();
        console.log(data);

        questions = data.map(question => ({ ...question, userAnswer: null }));
        subtopicPerformance = data.reduce((acc, question) => {
            acc[question.subtopic] = { correct: 0, total: 0 };
            return acc;
        }, {});

        displayQuestion();
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        document.getElementById('quiz-question').textContent = "Failed to load quiz questions.";
    }
}

function displayQuestion() {
    if (questions.length === 0) return;

    const question = questions[currentIndex];
    document.getElementById('quiz-question').textContent = question.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.dataset.index = index;

        if (question.userAnswer === index) {
            button.classList.add('selected');
        }

        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('prev-button').disabled = currentIndex === 0;
    document.getElementById('next-button').disabled = currentIndex === questions.length - 1;
}

function selectOption(index) {
    questions[currentIndex].userAnswer = index;

    const buttons = document.querySelectorAll('#quiz-options button');
    buttons.forEach(button => button.classList.remove('selected'));
    buttons[index].classList.add('selected');

    document.getElementById('submit-button').disabled = false;
}

function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuestion();
    }
}

function submitQuiz() {
    let score = 0;
    let attended = 0;

    questions.forEach(question => {
        if (question.userAnswer !== null) {
            attended++;
            const selectedAnswer = question.options[question.userAnswer]?.trim().toLowerCase();
            const correctAnswer = question.correctAnswer?.trim().toLowerCase();

            if (subtopicPerformance[question.subtopic]) {
                subtopicPerformance[question.subtopic].total++;
                if (selectedAnswer === correctAnswer) {
                    score++;
                    subtopicPerformance[question.subtopic].correct++;
                }
            }
        }
    });

    // Store subtopic performance in local storage
    localStorage.setItem('subtopicPerformance', JSON.stringify(subtopicPerformance));

    const resultsTable = Object.entries(subtopicPerformance)
        .map(([subtopic, { correct, total }]) => `
          <tr>
            <td>${subtopic}</td>
            <td>${correct}</td>
            <td>${total}</td>
            <td>${total ? ((correct / total) * 100).toFixed(0) + '%' : '0%'}</td>
          </tr>
        `)
        .join('');

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>You attended ${attended} out of ${questions.length} questions.</p>
        <p>Your Score: ${score} / ${questions.length}</p>
        <h2>Performance by Subtopic:</h2>
        <table>
          <tr><th>Subtopic</th><th>Correct</th><th>Total</th><th>Accuracy</th></tr>
          ${resultsTable}
        </table>
        <button class="retry-button" onclick="location.reload()">Retry Quiz</button>
        <button class="retry-button" onclick="sendResultsToGemini()">Road Map</button>
        <button class="retry-button" onclick="showChatbot()">Chat with Bot</button>
      `;
}

async function sendResultsToGemini() {
    const subtopicResults = JSON.parse(localStorage.getItem('subtopicPerformance'));

    if (!subtopicResults) {
        alert('No performance data available to send.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                performance: subtopicResults,
                topic: localStorage.getItem('selectedTopic') // Replace with the actual topic
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate roadmap.');
        }

        const data = await response.json();
        localStorage.setItem('roadmap', JSON.stringify(data.roadmap));
        window.location.href = 'roadmap.html'; // Redirect to roadmap page
    } catch (error) {
        console.error('Error generating roadmap:', error);
        alert('Failed to generate roadmap. Please try again later.');
    }
}


function showChatbot() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    // Add user's message to the chat box
    addMessageToChat('You', message);

    input.value = '';
    input.disabled = true;

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        console.log('Sending message:', message);


        if (!response.ok) {
            throw new Error('Failed to get response from chatbot');
        }

        const data = await response.json();
        addMessageToChat('Bot', data.answer);
    } catch (error) {
        console.error('Error sending message to the chatbot:', error);
        addMessageToChat('Bot', 'Sorry, I am unable to respond at the moment.');
    } finally {
        input.disabled = false;
    }
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

window.onload = fetchQuestions;
