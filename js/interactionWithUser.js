let answersElementHTML = ''
let UserQuestionsCorrects = 0
let userQuestionsErrors = 0
let anonymusFunction = ''

function insertingEventListenerInAnswers(answersElementHTML){    
    for(let i=0; i<answersElementHTML.length; i++){
        let answerElement = answersElementHTML[i]
        anonymusFunction = function(){
            selectedAnswer(answerElement)
        }
        answerElement.addEventListener('click', anonymusFunction)
    }
}

function deletingEventListernerInAnswers(answersElementHTML){
    let boxAnswers = answersElementHTML.querySelectorAll('figure')
    boxAnswers.forEach(boxAnswer => {
        boxAnswer.removeEventListener('click', anonymusFunction)
    })
}


function quizzIsSelected(){
    answersElementHTML = document.querySelectorAll('.active-quizz__questions-box__answers')
    if(answersElementHTML.length>0){
        clearInterval(verifyIfTheQuizzIsSelected)
        insertingEventListenerInAnswers(answersElementHTML)
    }
}

function selectedAnswer(element){
    let answerUserHtmlElement = element.querySelector('figcaption')
    let classNumberOfTheQuestion = element.parentNode.parentNode.classList[1]
    let numberOfTheQuestion = parseInt(classNumberOfTheQuestion[classNumberOfTheQuestion.length-1])
    
    let answerUserIsCorrect = correctAnswers[numberOfTheQuestion] === answerUserHtmlElement.innerText  
    if(answerUserIsCorrect){
        answerUserHtmlElement.classList.add('correct-answer')
    }else{
        answerUserHtmlElement.classList.add('wrong-answer')
    }
    deletingEventListernerInAnswers(element.parentNode)
    
}



let verifyIfTheQuizzIsSelected = setInterval(quizzIsSelected, 500)