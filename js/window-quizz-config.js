// vars ----------------------------------------------------
let selectedQuizz = ''
let activeQuizzClass = document.querySelector('.active-quizz')
let answers = []
let questions = []
let correctAnswers = []
let idElementGlobal = ''
// opening the quizz ---------------------------------------
function createTitleQuizz(){
    activeQuizzClass.innerHTML = `
    <figure class="active-quizz__header">
        <img src="${selectedQuizz.image}">
        <figcaption>${selectedQuizz.title}</figcaption>
    </figure>
    `
}

function insertingQuestionsInHTML(){ 
    let counter = 0
    selectedQuizz.questions.forEach(question =>{
        activeQuizzClass.innerHTML+=`
        <div class="active-quizz__questions-box question-${counter}">
            <h3 style="background-color: ${question.color}">${question.title}</h3>
            <div class="active-quizz__answers-box"></div>
        </div>  
        `
        counter += 1
    })
}

function savingQuestionsAndAnswers(){
    let questionsQuizz = selectedQuizz.questions 
    questionsQuizz.forEach(question => {
        answers.push(question.answers)
    })
}

function savingCorrectAnswer(answer){
     if(answer.isCorrectAnswer){
        correctAnswers.push(answer.text)
     }
}

function insertingAnswersInHTML(){
    let questionsBox = document.querySelectorAll('.active-quizz__answers-box')
    for(let i=0; i< questionsBox.length; i++){
        answers[i].forEach(answer=>{
            questionsBox[i].innerHTML+= `
            <figure onclick="selectThisAlternative(this)" class="active-quizz__questions-box__answers">
                <img class="alternative-img" src="${answer.image}">
                <figcaption class="alternative-figcaption">${answer.text}</figcaption>
            </figure>
            `
            savingCorrectAnswer(answer)
        })
    }
}

function createQuizzBoxQuestionsAndAnswer(){
    savingQuestionsAndAnswers()
    insertingQuestionsInHTML()
    insertingAnswersInHTML()

}

function insertTheSelectedQuizzOnTheActiveQuizzPage(){
    createTitleQuizz()
    createQuizzBoxQuestionsAndAnswer()
}

function saveTheSelectedQuizz(idElement){
    ALLQUIZZESLIST.forEach(quizz=>{
        let quizzIdIsTheSameAsTheIdElement = (parseInt(quizz.id) === parseInt(idElement))
        if(quizzIdIsTheSameAsTheIdElement){
            selectedQuizz = quizz
        }
    })
}

function openThisQuizz(idElement){
    hideElement('.my-quizzes')
    hideElement('.all-quizzes')
    idElementGlobal = idElement
    scrollTo(0,0)
    saveTheSelectedQuizz(idElement)    
    insertTheSelectedQuizzOnTheActiveQuizzPage()
    console.log(selectedQuizz)
}