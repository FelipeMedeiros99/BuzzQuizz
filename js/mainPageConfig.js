// ============== vars =========================== // 
const SERVERLINK ="https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
let ALLQUIZZESLIST = []
let requestReceived = ''


// ============== functions =========================== //

// function to add the quizzes to the main page --------------

function stopWaiting(){
    clearInterval(requestReceived)
}

function insertQuizzesOnTheMainPage(){
    let  htmlOflistQuizzes = document.querySelector('.all-quizzes__list-quizzes')
    ALLQUIZZESLIST.forEach(quizz=>{
        htmlOflistQuizzes.innerHTML += `
        <figure id=${quizz.id} class="all-quizzes__list-quizzes__quizz" onclick="openThisQuizz(id)">
            <img src="${quizz.image}">
            <figcaption>${quizz.title}</figcaption>
        </figure>
        `        
    })
}

function waitingForServerResponse(){
    if(ALLQUIZZESLIST.length === 50){
        stopWaiting()
        insertQuizzesOnTheMainPage()
    }
}

function saveQuizzesToAList(quizzes){
    ALLQUIZZESLIST = quizzes.data
}

function showRequestErr(requestErr){
    console.log(requestErr)
}

function serverRequest(){
    let request = axios.get(SERVERLINK)
    request.then(saveQuizzesToAList)
    request.catch(showRequestErr)
}

function insertQuizzesOnThePage(){
    serverRequest()
    requestReceived = setInterval(waitingForServerResponse, 500)
}

// opening the quizz ---------------------------------------

function openThisQuizz(idElement){
    console.log(idElement)
}


// ============= main code =================== // 
insertQuizzesOnThePage()