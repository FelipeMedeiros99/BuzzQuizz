// vars ----------------------------------------------------
let selectedQuizz = ''
let activeQuizzClass = document.querySelector('.active-quizz')
let answers = []
let questions = []
// opening the quizz ---------------------------------------
function createTitleQuizz(){
    activeQuizzClass.innerHTML = `
    <figure class="active-quizz__header">
        <img src="${selectedQuizz.image}">
        <figcaption>${selectedQuizz.title}<figcaption>
    </figure>
    `
}

function insertingQuestionsInHTML(){ 
    selectedQuizz.questions.forEach(question =>{
        activeQuizzClass.innerHTML+=`
        <div class="active-quizz__questions-box">
            <h3 style="background-color: ${question.color}">${question.title}</h3>
            <div class="active-quizz__answers-box"></div>
        </div>  
        `
    })
}

function savingQuestionsAndAnswers(){
    let questionsQuizz = selectedQuizz.questions 
    questionsQuizz.forEach(question => {
        answers.push(question.answers)
    })
}

function insertingAnswersInHTML(){
    let questionsBox = document.querySelectorAll('.active-quizz__answers-box')
    for(let i=0; i< questionsBox.length; i++){
        answers[i].forEach(answer=>{
            questionsBox[i].innerHTML+= `
            <figure class="active-quizz__questions-box__answers">
                <img class="alternative" src="${answer.image}">
                <figcaption>${answer.text}</figcaption>
            </figure>
            `
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
    hideElement('.all-quizzes')
    saveTheSelectedQuizz(idElement)    
    insertTheSelectedQuizzOnTheActiveQuizzPage()
    console.log(selectedQuizz)
}