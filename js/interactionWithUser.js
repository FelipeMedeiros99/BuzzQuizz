function quizzIsSelected(){
    let answersElementHTML = document.querySelectorAll('.active-quizz__questions-box__answers')
    if(answersElementHTML.length>0){
        clearInterval(verifyIfTheQuizzIsSelected)
        answersElementHTML.forEach(element=>{
            element.addEventListener('click', () => {
                selectedAnswer(element)
            })
        })
    }
}

function selectedAnswer(element){
    console.log(element)
}



let verifyIfTheQuizzIsSelected = setInterval(quizzIsSelected, 500)