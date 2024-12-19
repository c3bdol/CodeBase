const questions = [
    {
        question: "What is Dart primarily used for?",
        answers: [
            { text: "Backend development", correct: false },
            { text: "Frontend web development", correct: false },
            { text: "Building mobile and web applications", correct: true },
            { text: "Data analysis", correct: false },
        ]
    },
    {
        question: "Which data type in Dart is used to store true or false values?",
        answers: [
            { text: "int", correct: false },
            { text: "bool", correct: true },
            { text: "String", correct: false },
            { text: "double", correct: false },
        ]
    },
    {
        question: "Which widget is used to create a scrollable list in Flutter?",
        answers: [
            { text: "Container", correct: false },
            { text: "Column", correct: false },
            { text: "ListView", correct: true },
            { text: "Stack", correct: false },
        ]
    },
    {
        question: "What does the ‘setState’ method in Flutter do?",
        answers: [
            { text: "Updates the UI by re-rendering the widget tree", correct: true },
            { text: "Destroys the widget tree", correct: false },
            { text: "Initializes the widget", correct: false },
            { text: "Navigates to a new screen", correct: false },
        ]
    },
    {
        question: "Which Firebase service is commonly used for user authentication in a Flutter app?",
        answers: [
            { text: "Firebase Firestore", correct: false },
            { text: "Firebase Auth", correct: true },
            { text: "Firebase Storage", correct: false },
            { text: "Firebase Hosting", correct: false },
        ]
    },
    {
        question: "What is the purpose of Firebase Firestore?",
        answers: [
            { text: "To host your Flutter application", correct: false },
            { text: "To manage and store real-time data", correct: true },
            { text: "To send notifications", correct: false },
            { text: "To handle user authentication", correct: false },
        ]
    },
    {
        question: "Which widget is used to design the layout of buttons, images, and text in Flutter?",
        answers: [
            { text: "Scaffold", correct: false },
            { text: "Stack", correct: false },
            { text: "Row and Column", correct: true },
            { text: "AppBar", correct: false },
        ]
    },
    {
        question: "What is a StatefulWidget in Flutter?",
        answers: [
            { text: "A widget that does not maintain state", correct: false },
            { text: "A widget that maintains state and can rebuild dynamically", correct: true },
            { text: "A widget used for immutable data", correct: false },
            { text: "A widget used only for layout purposes", correct: false },
        ]
    },
    {
        question: "How do you define a map (key-value pair) in Dart?",
        answers: [
            { text: "Using List syntax", correct: false },
            { text: "Using curly braces {}", correct: true },
            { text: "Using parentheses ()", correct: false },
            { text: "Using square brackets []", correct: false },
        ]
    },
    {
        question: "Which UI element in Flutter allows users to input text?",
        answers: [
            { text: "Text", correct: false },
            { text: "TextField", correct: true },
            { text: "Container", correct: false },
            { text: "Row", correct: false },
        ]
    },
    {
        question: "What is the main difference between Firebase Firestore and Realtime Database?",
        answers: [
            { text: "Firestore is NoSQL while Realtime Database is SQL-based", correct: false },
            { text: "Firestore supports complex querying while Realtime Database does not", correct: true },
            { text: "Realtime Database is free while Firestore is not", correct: false },
            { text: "Firestore stores data in JSON format while Realtime Database does not", correct: false },
        ]
    },
    {
        question: "How does Firebase Cloud Messaging (FCM) integrate with Flutter?",
        answers: [
            { text: "For storing user data", correct: false },
            { text: "For sending push notifications", correct: true },
            { text: "For managing user authentication", correct: false },
            { text: "For integrating with Firestore", correct: false },
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