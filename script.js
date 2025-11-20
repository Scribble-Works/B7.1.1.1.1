// Game data based on the design plan
const questions = [
    {
        number: 3000000000,
        question: "How many Billion Blocks (B) represent the number:",
        correctAnswer: "3 B",
        options: ["3 B", "300 M", "3 B and 50 M", "30 B"]
    },
    {
        number: 1500000000,
        question: "Select the correct representation for the number:",
        correctAnswer: "1 B and 500 M",
        options: ["15 M", "1 B and 5 M", "1 B and 500 M", "15 B"]
    },
    {
        number: 2100000000,
        question: "Select the correct representation for the number:",
        correctAnswer: "2 B and 100 M",
        options: ["2 B and 100 M", "21 B", "2 B and 10 M", "210 M"]
    },
    {
        number: 4000000000,
        question: "How many Billion Blocks (B) represent the number:",
        correctAnswer: "4 B",
        options: ["4 B", "400 M", "40 B", "4 B and 1 M"]
    },
    {
        number: 1005000000,
        question: "Select the correct representation for the number:",
        correctAnswer: "1 B and 5 M",
        options: ["1 B and 50 M", "1 B and 5 M", "1 B and 500 M", "10 B and 5 M"]
    },
    {
        number: 3250000000,
        question: "Select the correct representation for the number:",
        correctAnswer: "3 B and 250 M",
        options: ["3 B and 25 M", "32 B and 5 M", "3 B and 250 M", "3 B and 205 M"]
    },
    {
        number: 1999000000,
        question: "Select the representation for the number:",
        correctAnswer: "1 B and 999 M",
        options: ["2 B", "1 B and 99 M", "1 B and 999 M", "19 B and 99 M"]
    },
    {
        number: 5000000000,
        question: "How many Billion Blocks (B) represent the number:",
        correctAnswer: "5 B",
        options: ["5 B", "50 M", "50 B", "5 B and 5 M"]
    },
    {
        number: 2020000000,
        question: "Select the correct representation for the number:",
        correctAnswer: "2 B and 20 M",
        options: ["2 B and 200 M", "2 B and 20 M", "22 B", "20 B and 2 M"]
    },
    {
        number: 4500000000,
        question: "Select the correct representation for the number:",
        correctAnswer: "4 B and 500 M",
        options: ["4 B and 5 M", "450 M", "4 B and 50 M", "4 B and 500 M"]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Function to shuffle an array (for randomizing options)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to switch between screens
function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// Start the game
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    // Optional: Shuffle the question order at the start
    // shuffleArray(questions);
    switchScreen('quiz-screen');
    loadQuestion();
}

// Load the current question onto the screen
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        gameOver();
        return;
    }

    const q = questions[currentQuestionIndex];
    
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById('question-text').textContent = `${q.question} ${q.number.toLocaleString()}?`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options

    // Shuffle options before display
    let shuffledOptions = [...q.options];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option;
        button.onclick = () => selectOption(button, option, q.correctAnswer);
        optionsContainer.appendChild(button);
    });
}

// Handle option selection
function selectOption(selectedButton, selectedAnswer, correctAnswer) {
    // Disable all options after selection
    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
        // Highlight correct and incorrect answers
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button === selectedButton) {
            button.classList.add('incorrect');
        }
    });

    // Check if the answer is correct
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000); // 1 second delay to see the result
}

// End the game and show final score
function gameOver() {
    document.getElementById('final-score').textContent = 
        `You scored ${score} out of ${questions.length}!`;
    switchScreen('game-over-screen');
}

// Restart the game (called from Game Over screen)
function restartGame() {
    // Resets the state and shows the start screen
    switchScreen('start-screen');
}

// Initialize the game to show the start screen on load
document.addEventListener('DOMContentLoaded', () => {
    switchScreen('start-screen');
});