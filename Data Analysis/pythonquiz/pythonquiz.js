const questions = [
    {
        question: "Which of the following Python libraries is primarily used for data manipulation and analysis??",
        answers: [
            { text: "NumPy", correct: false },
            { text: "pandas", correct: true },
            { text: "Seaborn", correct: false },
            { text: "Matplotlib", correct: false },
        ]
    },
    {
        question: "Which Python data structure is used to store a collection of ordered items that can be changed?",
        answers: [
            { text: "Set", correct: false },
            { text: "List", correct: true },
            { text: "Dictionary", correct: false },
            { text: "Tuple", correct: false }
        ]
    }
    ,
    {
        question: "What function is used to read a CSV file into a pandas DataFrame?",
        answers: [
            { text: "read_csv()", correct: false },
            { text: "pd.csv_read()", correct: false },
            { text: "pd.read_csv()", correct: true },
            { text: "pd.read_dataframe()", correct: false }
        ]
    },
    {
        question: "Which method is used to check for missing values in a pandas DataFrame?",
        answers: [
            { text: "df.isnull()", correct: true },
            { text: "df.checknull()", correct: false },
            { text: "df.missing()", correct: false },
            { text: "df.isNaN()", correct: false }
        ]
    },
    {
        question: "What does the groupby() function in pandas do?",
        answers: [
            { text: "Groups data by columns for aggregation", correct: true },
            { text: "Creates a summary of the data", correct: false },
            { text: "Sorts the DataFrame based on values", correct: false },
            { text: "Filters out missing values", correct: false }
        ]
    }
    ,
    {
        question: "Which of the following is the correct syntax to drop a column from a pandas DataFrame?",
        answers: [
            { text: "df.delete('column_name')", correct: false },
            { text: "df.drop('column_name')", correct: false },
            { text: "df.drop(columns='column_name')", correct: true },
            { text: "df.remove('column_name')", correct: false }
        ]
    } ,
    {
        question: "Which function in NumPy is used to create an array of equally spaced values over a specified range?",
        answers: [
            { text: "np.linspace()", correct: true },
            { text: "np.arange()", correct: false },
            { text: "np.array()", correct: false },
            { text: "np.equally_space()", correct: false }
        ]
    } ,
    {
        question: "Which of the following is used to perform machine learning tasks in Python?",
        answers: [
            { text: "pandas", correct: false },
            { text: "Matplotlib", correct: false },
            { text: "scikit-learn", correct: true },
            { text: "seaborn", correct: false }
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