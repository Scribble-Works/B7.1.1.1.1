// Game data with conceptual explanations
const questions = [
    { 
        number: 3000000000, 
        question: "How many Billion Blocks (B) represent the number:", 
        correctAnswer: "3 B", 
        options: ["3 B", "300 M", "3 B and 50 M", "30 B"],
        explanation: "<strong>Explanation:</strong> 3,000,000,000 has a 3 in the billions place and zeros everywhere else. Because 1 Billion (B) = 1,000,000,000, this number is represented perfectly by exactly <strong>3 B</strong>."
    },
    { 
        number: 1500000000, 
        question: "Select the correct representation for the number:", 
        correctAnswer: "1 B and 500 M", 
        options: ["15 M", "1 B and 5 M", "1 B and 500 M", "15 B"],
        explanation: "<strong>Explanation:</strong> Breaking down 1,500,000,000 gives us 1,000,000,000 (which is 1 B) and 500,000,000 (which is 500 M). Together, they form <strong>1 B and 500 M</strong>."
    },
    { 
        number: 2100000000, 
        question: "Select the correct representation for the number:", 
        correctAnswer: "2 B and 100 M", 
        options: ["2 B and 100 M", "21 B", "2 B and 10 M", "210 M"],
        explanation: "<strong>Explanation:</strong> Look at the place values: there is a 2 in the billions place (2 B) and a 1 in the hundred-millions place (100 M). Thus, the correct breakdown is <strong>2 B and 100 M</strong>."
    },
    { 
        number: 4000000000, 
        question: "How many Billion Blocks (B) represent the number:", 
        correctAnswer: "4 B", 
        options: ["4 B", "400 M", "40 B", "4 B and 1 M"],
        explanation: "<strong>Explanation:</strong> The number 4,000,000,000 translates directly to 4 Billion. It requires exactly <strong>4 B</strong> blocks and no extra million blocks."
    },
    { 
        number: 1005000000, 
        question: "Select the correct representation for the number:", 
        correctAnswer: "1 B and 5 M", 
        options: ["1 B and 50 M", "1 B and 5 M", "1 B and 500 M", "10 B and 5 M"],
        explanation: "<strong>Explanation:</strong> Be careful with the placeholders! 1,005,000,000 features a 1 in the billions place (1 B). The millions period reads '005', which means just 5 million (5 M). This leaves us with <strong>1 B and 5 M</strong>."
    },
    { 
        number: 3250000000, 
        question: "Select the correct representation for the number:", 
        correctAnswer: "3 B and 250 M", 
        options: ["3 B and 25 M", "32 B and 5 M", "3 B and 250 M", "3 B and 205 M"],
        explanation: "<strong>Explanation:</strong> Splitting 3,250,000,000 gives us 3 Billion (3 B) and 250 Million (250 M). Therefore, it matches <strong>3 B and 250 M</strong>."
    },
    { 
        number: 1999000000, 
        question: "Select the representation for the number:", 
        correctAnswer: "1 B and 999 M", 
        options: ["2 B", "1 B and 99 M", "1 B and 999 M", "19 B and 99 M"],
        explanation: "<strong>Explanation:</strong> This quantity is just 1 Million short of reaching 2 Billion! It is composed of 1 Billion (1 B) along with 999 Million (999 M), making it <strong>1 B and 999 M</strong>."
    },
    { 
        number: 5000000000, 
        question: "How many Billion Blocks (B) represent the number:", 
        correctAnswer: "5 B", 
        options: ["5 B", "50 M", "50 B", "5 B and 5 M"],
        explanation: "<strong>Explanation:</strong> 5,000,000,000 reads out loud as five billion. It is represented cleanly by <strong>5 B</strong> blocks."
    },
    { 
        number: 2020000000, 
        question: "Select the correct representation for the number:", 
        correctAnswer: "2 B and 20 M", 
        options: ["2 B and 200 M", "2 B and 20 M", "22 B", "20 B and 2 M"],
        explanation: "<strong>Explanation:</strong> Watch out for the zeros. 2,020,000,000 has 2 in the billions place (2 B). The millions period contains '020', which translates to 20 Million (20 M). So, it's <strong>2 B and 20 M</strong>."
    },
    { 
        number: 4500000000, 
        question: "Select the correct representation for the number:", 
        correctAnswer: "4 B and 500 M", 
        options: ["4 B and 5 M", "450 M", "4 B and 50 M", "4 B and 500 M"],
        explanation: "<strong>Explanation:</strong> 4,500,000,000 splits evenly right at the comma boundary into 4 Billion (4 B) and 500 Million (500 M), matching <strong>4 B and 500 M</strong>."
    }
];

let currentQuestionIndex = 0;
let score = 0;

let correctSound, wrongSound;

function initAudio() {
    correctSound = new Audio('assets/brass-fanfare-reverberated-146263.mp3');
    wrongSound = new Audio('assets/cartoon-fail-trumpet-278822.mp3');
    correctSound.load();
    wrongSound.load();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    switchScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        gameOver();
        return;
    }

    // Keep feedback container hidden when loading a fresh question
    document.getElementById('feedback-container').classList.add('hidden');

    const q = questions[currentQuestionIndex];
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById('question-text').textContent = `${q.question} ${q.number.toLocaleString()}?`;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

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

function selectOption(selectedButton, selectedAnswer, correctAnswer) {
    // Disable all options and show colors
    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button === selectedButton) {
            button.classList.add('incorrect');
        }
    });

    // Branching Logic based on answer accuracy
    if (selectedAnswer === correctAnswer) {
        score++;
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log("Correct sound error:", e.message));
        
        // Auto-advance after 1 second so they can see the green highlight brief confirmation
        setTimeout(() => {
            nextQuestion();
        }, 1000);
        
    } else {
        wrongSound.currentTime = 0;
        wrongSound.play().catch(e => console.log("Wrong sound error:", e.message));
        
        // Stop the game and force show the explanation block with the Next button
        const q = questions[currentQuestionIndex];
        document.getElementById('explanation-text').innerHTML = q.explanation;
        document.getElementById('feedback-container').classList.remove('hidden');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function gameOver() {
    document.getElementById('final-score').textContent = `You scored ${score} out of ${questions.length}!`;
    switchScreen('game-over-screen');
}

function restartGame() {
    switchScreen('start-screen');
}

document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    switchScreen('start-screen');
});