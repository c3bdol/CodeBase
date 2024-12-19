const questions = [
    {
        question: "Which type of chart is best suited for showing the proportions of categories in a dataset?",
        answers: [
            { text: "Bar chart", correct: false },
            { text: "Pie chart", correct: true },
            { text: "Line graph", correct: false },
            { text: "Scatter plot", correct: false },
        ]
    },
    {
        question: "What is the primary use of a scatter plot?",
        answers: [
            { text: "To compare categories", correct: false },
            { text: "To show trends over time", correct: false },
            { text: "To display relationships between two variables", correct: true },
            { text: "To summarize data distributions", correct: false },
        ]
    },
    {
        question: "Which of the following is true about a box plot?",
        answers: [
            { text: "It shows individual data points clearly.", correct: false },
            { text: "It highlights the mean and standard deviation of data.", correct: false },
            { text: "It visualizes the minimum, first quartile, median, third quartile, and maximum.", correct: true },
            { text: "It is primarily used for categorical data.", correct: false },
        ]
    },
    {
        question: "What does the height of bars in a histogram represent?",
        answers: [
            { text: "The frequency of data within each bin", correct: true },
            { text: "The cumulative count of data points", correct: false },
            { text: "The range of the dataset", correct: false },
            { text: "The median of each bin", correct: false },
        ]
    },
    {
        question: "Which of these charts is best for showing changes over time?",
        answers: [
            { text: "Pie chart", correct: false },
            { text: "Line graph", correct: true },
            { text: "Histogram", correct: false },
            { text: "Scatter plot", correct: false },
        ]
    },
    {
        question: "Which visualization is best for comparing multiple categories in a dataset?",
        answers: [
            { text: "Bar chart", correct: true },
            { text: "Line graph", correct: false },
            { text: "Scatter plot", correct: false },
            { text: "Box plot", correct: false },
        ]
    },
    {
        question: "What is a heatmap commonly used for?",
        answers: [
            { text: "Displaying geographical data", correct: false },
            { text: "Showing trends over time", correct: false },
            { text: "Representing relationships between variables with color intensity", correct: true },
            { text: "Highlighting outliers in a dataset", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT an important principle of effective data visualization?",
        answers: [
            { text: "Keep it simple", correct: false },
            { text: "Use contrasting colors", correct: false },
            { text: "Distort the data for emphasis", correct: true },
            { text: "Choose the right chart for the data", correct: false },
        ]
    },
    {
        question: "What does the x-axis usually represent in a bar chart?",
        answers: [
            { text: "Numerical values", correct: false },
            { text: "Categories or groups", correct: true },
            { text: "Frequency", correct: false },
            { text: "Time", correct: false },
        ]
    },
    {
        question: "What is the purpose of a legend in a chart?",
        answers: [
            { text: "To display the title of the chart", correct: false },
            { text: "To label the x-axis and y-axis", correct: false },
            { text: "To explain the meaning of colors or symbols used", correct: true },
            { text: "To summarize the data", correct: false },
        ]
    }
];



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