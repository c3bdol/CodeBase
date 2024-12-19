const questions = [
    {
        question: "What is the function of the <title>  tag in an HTML document?",
        answers: [
            { text: " Displays a title inside the webpage body", correct: false },
            { text: "Sets the title shown on the browser tab", correct: true },
            { text: "Defines the main heading of the webpage", correct: false },
            { text: "Adds metadata to the webpage", correct: false },
        ]
    },
    {
        question: "Which tag is used to display an image in HTML?",
        answers: [
            { text: "<img>", correct: true },
            { text: "<image>", correct: false },
            { text: "<pic>", correct: false },
            { text: "<src>", correct: false }
        ]
    }
    ,
    {
        question: "What attribute is used to make a link open in a new tab?",
        answers: [
            { text: "href", correct: false },
            { text: "target=_blank", correct: true },
            { text: "rel=newtab", correct: false },
            { text: "open=new", correct: false }
        ]
    },
    {
        question: "What is the purpose of the <footer> tag?",
        answers: [
            { text: " To create navigation menus", correct: false },
            { text: "To define a container for introductory content", correct: false },
            { text: "To specify footer content such as copyright or contact information", correct: true },
            { text: "To format text with italic style", correct: false }
        ]
    }
    ,
    {
        question: "Which HTML attribute specifies an alternative text for an image if the image cannot be displayed?",
        answers: [
            { text: "alt", correct: true },
            { text: "title", correct: false },
            { text: "src", correct: false },
            { text: "description", correct: false }
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
    nextButton.textContent = "Next";
    showQuestion();
}
function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
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

    questionElement.textContent = `${score > (Math.ceil(questions.length / 2)) ? 'Congratulations,' : 'Oops!, '} You scored ${score} out of ${questions.length}`;
    questionElement.style.color = `${score > (Math.ceil(questions.length / 2)) ? 'Green' : 'Red'}`
    nextButton.textContent = "Play Again";
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