const question = [{
    question : "Which is largest animal in the world",
    answer : [
        {text : "shark",correct : false},
        {text : "blue Whale",correct : true},
        {text : "Elephant",correct : false},
        {text : "Giraff",correct : false},
    ]
},
{
    question : "Which is smallest contient in the world",
    answer : [
        {text : "Asis",correct : false},
        {text : "Australia",correct : true},
        {text : "Arctic",correct : false},
        {text : "Africa",correct : false},
    ]
},
{
    question : "Which is smallest country in the world",
    answer : [
        {text : "Vatican City",correct : true},
        {text : "Bhutan",correct : false},
        {text : "Nepal",correct : false},
        {text : "Shri Lanka",correct : false},
    ] 
}

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestion + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target ;
    const isCorrect = selectBtn.dataset.correct ==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display = "block";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    }else{
        showScrore();
    }
}

function showScrore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();