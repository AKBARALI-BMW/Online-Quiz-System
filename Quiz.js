const questions = [
    { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0 },
    { question: "What does CSS stand for?", answers: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], correct: 1 },
    { question: "What is the correct way to link an external CSS file?", answers: ["<css src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<style src='style.css'>"], correct: 1 },
    { question: "Which of the following is a JavaScript framework?", answers: ["React", "Laravel", "Django"], correct: 0 },
    { question: "What is the purpose of the `<head>` section in HTML?", answers: ["Contains the main content", "Contains metadata and links to resources", "Displays page title"], correct: 1 },
    { question: "Which symbol is used for ID selectors in CSS?", answers: [". (dot)", "# (hash)", "* (asterisk)"], correct: 1 },
    { question: "Which HTML tag is used to define an unordered list?", answers: ["<ol>", "<ul>", "<li>"], correct: 1 },
    { question: "Which property is used to change the text color in CSS?", answers: ["font-color", "text-color", "color"], correct: 2 },
    { question: "What is the correct syntax for a function in JavaScript?", answers: ["function = myFunction()", "function myFunction()", "myFunction function()"], correct: 1 },
    { question: "Which tag is used for inserting JavaScript code into an HTML page?", answers: ["<js>", "<javascript>", "<script>"], correct: 2 },
    { question: "Which HTML attribute is used to define inline styles?", answers: ["class", "style", "id"], correct: 1 },
    { question: "What is Bootstrap mainly used for?", answers: ["Server-side programming", "Responsive web design", "Database management"], correct: 1 },
    { question: "Which of the following is NOT a valid JavaScript data type?", answers: ["String", "Boolean", "Character"], correct: 2 },
    { question: "Which property is used to control the spacing between elements in CSS?", answers: ["margin", "spacing", "padding"], correct: 0 },
    { question: "What does the 'href' attribute in the `<a>` tag specify?", answers: ["Hyperlink destination", "Hyperlink text", "Hyperlink color"], correct: 0 },
    { question: "Which JavaScript method is used to write content to an HTML document?", answers: ["document.write()", "console.log()", "innerHTML"], correct: 0 },
    { question: "Which operator is used for strict comparison in JavaScript?", answers: ["==", "===", "!="], correct: 1 },
    { question: "How do you declare a JavaScript variable?", answers: ["var name;", "variable name;", "declare name;"], correct: 0 },
    { question: "Which CSS property is used to make text bold?", answers: ["text-weight", "font-weight", "bold"], correct: 1 },
    { question: "What is the default display property of a `<div>` element?", answers: ["inline", "block", "flex"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 600; // 10 minutes
let timerInterval;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("time");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");
const scoreDisplay = document.getElementById("score");
const studentInfo = document.getElementById("student-info");

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

function startQuiz() {
    document.getElementById("welcome-screen").classList.add("hidden");
    quizContainer.classList.remove("hidden");
    timerInterval = setInterval(updateTimer, 1000);
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.dataset.index = index;
        button.addEventListener("click", checkAnswer);
        answerButtons.appendChild(button);
    });

    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function resetState() {
    answerButtons.innerHTML = "";
    nextButton.classList.add("hidden");
}

function checkAnswer(event) {
    const selectedButton = event.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    const correctIndex = questions[currentQuestionIndex].correct;

    if (selectedIndex === correctIndex) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        setTimeout(() => showCorrectAnswer(correctIndex), 500);
    }

    nextButton.classList.remove("hidden");
}

function showCorrectAnswer(correctIndex) {
    const correctAnswerButton = answerButtons.querySelector(`[data-index="${correctIndex}"]`);
    if (correctAnswerButton) {
        correctAnswerButton.classList.add("correct");
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timeDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
        clearInterval(timerInterval);
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    let studentName = document.getElementById("student-name").value;
    let studentCNIC = document.getElementById("student-cnic").value;
    let studentReg = document.getElementById("student-reg").value;

    studentInfo.innerText = `Student: ${studentName} | CNIC: ${studentCNIC} | Reg: ${studentReg}`;
    scoreDisplay.innerText = `Score: ${score} / 20`;

    if (score >= 18) {
        resultMessage.innerText = "🎉 Excellent! Congratulations!";
        scoreDisplay.classList.add("excellent");
    } else if (score >= 15) {
        resultMessage.innerText = "✅ You Passed! Well Done!";
        scoreDisplay.classList.add("passed");
    } else {
        resultMessage.innerText = "❌ You Failed. Better Luck Next Time!";
        scoreDisplay.classList.add("failed");
    }
}
