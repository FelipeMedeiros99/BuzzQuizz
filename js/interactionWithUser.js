let answersElementHTML = ''
let UserQuestionsCorrects = 0
let userQuestionsErrors = 0

function allQuestionsWereAnswered(){
    let numberOfQuestions = document.querySelectorAll('.active-quizz__questions-box').length
    let sumOfUserResponses = userQuestionsErrors + UserQuestionsCorrects
    if (numberOfQuestions === sumOfUserResponses){
        alert("all questions was selected")
    }
}

function removeOnclick(element){
    let answers = element.querySelectorAll('.active-quizz__questions-box__answers')
    answers.forEach(answer => {
        answer.removeAttribute('onclick')        
    });
}

function grayOutTheOtherOptions(element){
    let alternatives = element.querySelectorAll('.active-quizz__questions-box__answers')
    alternatives.forEach(alternative => {
        let figcaption = alternative.querySelector('figcaption')
        let alternativeIsCorrect = figcaption.classList.contains('correct-answer')

        let alternativeIsWrong = figcaption.classList.contains('wrong-answer')

        if(!alternativeIsCorrect && !alternativeIsWrong){
            alternative.classList.add('not-selected')
        }

    })

}

function markGreenOrRedForTheOtherQuestions(element, numberQuestion){
    let answers = element.querySelectorAll('figcaption')
    for(let i=0; i<answers.length; i++){
        if (correctAnswers[numberQuestion] === answers[i].innerText){
            answers[i].classList.add('correct-answer')
        }else{
            answers[i].classList.add('wrong-answer')
        }


    }
    console.log(answers)
}


function selectThisAlternative(element){
    let parentElement = element.parentNode.parentNode
    let indexOfNumberQuestion = parentElement.classList[1].length-1
    let numberQuestion = parseInt(parentElement.classList[1][indexOfNumberQuestion])
    let answerUser = element.querySelector('figcaption').innerText
    let elementAnswerUser = element.querySelector('figcaption')



    if (correctAnswers[numberQuestion] === answerUser){
        elementAnswerUser.classList.add('correct-answer')
        UserQuestionsCorrects += 1
    }else{
        elementAnswerUser.classList.add('wrong-answer')
        userQuestionsErrors += 1
    }

    removeOnclick(parentElement)
    grayOutTheOtherOptions(parentElement)
    markGreenOrRedForTheOtherQuestions(parentElement, numberQuestion)
    allQuestionsWereAnswered()

}




// let anonymusFunction = ''

// function insertingEventListenerInAnswers(answersElementHTML){    
//     for(let i=0; i<answersElementHTML.length; i++){
//         let answerElement = answersElementHTML[i]
//         anonymusFunction = function(){
//             selectedAnswer(answerElement)
//         }
//         answerElement.addEventListener('click', anonymusFunction)
//     }
// }

// function deletingEventListernerInAnswers(answersElementHTML){
//     let boxAnswers = answersElementHTML.querySelectorAll('figure')
//     boxAnswers.forEach(boxAnswer => {
//         boxAnswer.removeEventListener('click', anonymusFunction)
//     })
// }


// function quizzIsSelected(){
//     answersElementHTML = document.querySelectorAll('.active-quizz__questions-box__answers')
//     if(answersElementHTML.length>0){
//         clearInterval(verifyIfTheQuizzIsSelected)
//         insertingEventListenerInAnswers(answersElementHTML)
//     }
// }

// function selectedAnswer(element){
//     let answerUserHtmlElement = element.querySelector('figcaption')
//     let classNumberOfTheQuestion = element.parentNode.parentNode.classList[1]
//     let numberOfTheQuestion = parseInt(classNumberOfTheQuestion[classNumberOfTheQuestion.length-1])
    
//     let answerUserIsCorrect = correctAnswers[numberOfTheQuestion] === answerUserHtmlElement.innerText  
//     if(answerUserIsCorrect){
//         answerUserHtmlElement.classList.add('correct-answer')
//     }else{
//         answerUserHtmlElement.classList.add('wrong-answer')
//     }
//     deletingEventListernerInAnswers(element.parentNode)
    
// }



// let verifyIfTheQuizzIsSelected = setInterval(quizzIsSelected, 500)