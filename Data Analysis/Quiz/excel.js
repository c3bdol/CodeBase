const questions = [
    {
        question: "What function would you use in Excel to calculate the average of a range of cells?",
        answers: [
            { text: "SUM()", correct: false },
            { text: "AVERAGE()", correct: true },
            { text: "COUNT()", correct: false },
            { text: "IF()", correct: false },
        ]
    },
    {
        question: "In Excel, which of the following is NOT a valid type of data visualization you can create using the (Insert) tab??",
        answers: [
            { text: "Pie Chart", correct: false },
            { text: "Pivot Table", correct: true },
            { text: "Scatter Plot", correct: false },
            { text: "Line Graph", correct: false }
        ]
    }
    ,
    {
        question: "What does the VLOOKUP() function do in Excel?",
        answers: [
            { text: "It searches for a row and returns the value from the first column.", correct: false },
            { text: "It counts the number of cells in a range that meet a condition.", correct: false },
            { text: "It looks for a value in the first column and returns a value in the same row from another column.", correct: true },
            { text: "It vertically arranges data in ascending or descending order.", correct: false }
        ]
    },
    {
        question: "What is the purpose of a Pivot Table in Excel?",
        answers: [
            { text: "To summarize and analyze data dynamically", correct: true },
            { text: "To perform calculations on large data sets", correct: false },
            { text: "To create graphs and charts", correct: false },
            { text: "To filter data based on conditions", correct: false }
        ]
    },
    {
        question: "Which of the following Excel functions is used to look up a value in a table and return a value in a specified column??",
        answers: [
            { text: "VLOOKUP()", correct: true },
            { text: "INDEX()", correct: false },
            { text: "HLOOKUP()", correct: false },
            { text: "MATCH()", correct: false }
        ]
    }
    ,
    {
        question: "What Excel function would you use to count how many cells contain numbers within a range?",
        answers: [
            { text: "SUM()", correct: false },
            { text: "COUNTIF()", correct: false },
            { text: "COUNTA()", correct: false },
            { text: "COUNT()", correct: true }
        ]
    },
    {
        question: "Which of the following functions can be used to combine text from multiple cells in Excel?",
        answers: [
            { text: "IF()", correct: false },
            { text: "SUM()", correct: false },
            { text: "INDEX()", correct: false },
            { text: "CONCATENATE() or TEXTJOIN()", correct: true }
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