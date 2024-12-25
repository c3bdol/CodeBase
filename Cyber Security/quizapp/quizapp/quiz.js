const questions = [
    {
        question: "Which protocol is used to resolve a domain name to an IP address?",
        answers: [
            { text: "HTTP", correct: false },
            { text: "DNS", correct: true },
            { text: "DHCP", correct: false },
            { text: "FTP", correct: false },
        ]
    },
    {
        question: " What is the primary purpose of a firewall in a network?",
        answers: [
            { text: "To route data between networks", correct: false },
            { text: "To filter and block unauthorized access", correct: true },
            { text: "To encrypt data for secure communication", correct: false },
            { text: "To provide wireless connectivity", correct: false }
        ]
    }
    ,
    {
        question: "What is the maximum length of a standard Ethernet cable (Cat 5e/6) for reliable data transmission??",
        answers: [
            { text: "50 meters", correct: false },
            { text: "150 meters", correct: false },
            { text: "100 meters", correct: true },
            { text: "75 meters", correct: false }
        ]
    },
    {
        question: "Which of the following is an example of a strong password?",
        answers: [
            { text: "P@$$w0rd!2023", correct: true },
            { text: "Password123", correct: false },
            { text: "12345", correct: false },
            { text: "admin", correct: false }
        ]
    },
    {
        question: "What is the primary purpose of a firewall?",
        answers: [
            { text: "Block unauthorized access to a network", correct: true },
            { text: "Monitor employee activities", correct: false },
            { text: "Provide antivirus protection", correct: false },
            { text: "Encrypt data on a network", correct: false }
        ]
    }
    ,
    {
        question: "Which command is used to list all files and directories in the current working directory in Linux?",
        answers: [
            { text: "cd", correct: false },
            { text: "mkdir", correct: false },
            { text: "pwd", correct: false },
            { text: "ls", correct: true }
        ]
    },
    {
        question: "What is the first phase of a penetration testing lifecycle?",
        answers: [
            { text: "Exploitation", correct: false },
            { text: "Information Gathering", correct: false },
            { text: "Post-exploitation", correct: false },
            { text: " Information Gathering", correct: true }
        ]
    }


]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // check the answer state from JSON 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}


function resetState() {
    // undisplay the next button
    nextButton.style.display = "none";
    // remove the answer buttons 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore() {
    resetState();

    questionElement.innerHTML = `${score > (Math.ceil(questions.length / 2)) ? 'Congratulations,' : 'Oops!, '} You scored ${score} out of ${questions.length}`;
    questionElement.style.color = `${score > (Math.ceil(questions.length / 2)) ? 'Green' : 'Red'}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        //remove the choices of the current question & add the questions of the next question
        resetState();
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    } else {
        //reset the question color to default and start the quiz again 
        questionElement.style.color = '#001e4d';
        startQuiz();
    }
})
startQuiz();