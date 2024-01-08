let answersElementHTML = ''
let UserQuestionsCorrects = 0
let userQuestionsErrors = 0


//  --------- interaction with user in the questions quizz --------------- //

function allQuestionsWereAnswered(){
    let numberOfQuestions = document.querySelectorAll('.active-quizz__questions-box').length
    let sumOfUserResponses = userQuestionsErrors + UserQuestionsCorrects
    if (numberOfQuestions === sumOfUserResponses){
        resultWindow()
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

// ------------ results window ----------------------------- //

function userLevel(percentage){
    let levels = selectedQuizz.levels
    let levelUser = ''

    levels.forEach(level=>{
        let percentageIsGreatherThanLevelMin = (percentage >= level.minValue)
        if(percentageIsGreatherThanLevelMin){
            levelUser = level
        }
    })
    return levelUser
}

function goTo(element){
    element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    })
}

function resultWindow(){
    let elementQUizzAtivo = document.querySelector(".active-quizz")
    let totalQuestions = userQuestionsErrors + UserQuestionsCorrects
    let correctPercentage = Math.round((UserQuestionsCorrects/totalQuestions)*100)
    let level = userLevel(correctPercentage)
    console.log(level)
    // console.log(selectedQuizz)
    elementQUizzAtivo.innerHTML+= ` 
    <div class="results">
        <h2 class="results__title">${correctPercentage}% de acerto: ${level.title}</h2>
        <div class="legend-results">
            <img class="results__img" src="${level.image}">
            <p class="results__text">${level.text}</p>
        </div>
        <button onclick="restartQuizz()" class="results__restart-button">Reiniciar Quizz</button>
        <button onclick="resetQuizz()" class="results__reset-button">Voltar pra home</button>
    </div>`

    goTo(document.querySelector('.results'))
}

function restartQuizz(){
    let activeQuizz = document.querySelector('.active-quizz')
    activeQuizz.innerHTML = ""
    userQuestionsErrors = 0
    UserQuestionsCorrects = 0    
    openThisQuizz(idElementGlobal)
}

function resetQuizz(){
    window.location.reload()
}