// vars ----------------------------------------------------
let selectedQuizz = ''

// opening the quizz ---------------------------------------
function createTitleQuizz(){
    let activeQuizzClass = document.querySelector('.active-quizz')
    activeQuizzClass.innerHTML = `
    <figure class="active-quizz__header">
        <img src="${selectedQuizz.image}">
        <figcaption>${selectedQuizz.title}<figcaption>
    </figure>
    `
}

function hideMainPage(){
    document.querySelector('.all-quizzes').classList.add('oculto')
}

function insertTheSelectedQuizzOnTheActiveQuizzPage(){
    createTitleQuizz()
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
    hideMainPage()
    saveTheSelectedQuizz(idElement)    
    insertTheSelectedQuizzOnTheActiveQuizzPage()
    console.log(selectedQuizz)
}