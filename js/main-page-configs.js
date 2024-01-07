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
    let idsQuizzesCreateds = localStorage['my-quizzes']

    if(idsQuizzesCreateds !== undefined){
        idsQuizzesCreateds = JSON.parse(idsQuizzesCreateds)
    }
    
    ALLQUIZZESLIST.forEach(quizz=>{

        if(idsQuizzesCreateds !== undefined){
            if(idsQuizzesCreateds.indexOf(quizz.id) === -1){
    
                htmlOflistQuizzes.innerHTML += `
                <figure id=${quizz.id} class="all-quizzes__list-quizzes__quizz" onclick="openThisQuizz(id)">
                <img src="${quizz.image}">
                <figcaption>${quizz.title}</figcaption>
                </figure>
                `        
            }
        }

        else{
            htmlOflistQuizzes.innerHTML += `
            <figure id=${quizz.id} class="all-quizzes__list-quizzes__quizz" onclick="openThisQuizz(id)">
            <img src="${quizz.image}">
            <figcaption>${quizz.title}</figcaption>
            </figure>
            `       
        }

    })
}

function waitingForServerResponse(){
    if(ALLQUIZZESLIST.length === 50){
        stopWaiting()
        insertQuizzesOnTheMainPage()
        verifyIfWasQuizzesCreates()
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


// ============= quizzes createds ==============
function insertMyCreatedQuizzesOnThePage(){
    let  htmlOflistQuizzes = document.querySelector('.my-quizzes__with-quizz')
    idsQuizzesCreateds = localStorage['my-quizzes']
    if(idsQuizzesCreateds !== undefined){
        idsQuizzesCreateds = JSON.parse(localStorage['my-quizzes'])
    }


    htmlOflistQuizzes.innerHTML = `
    <div class="my-quizzes-created">
        <nav class="my-quizzes-created__legend">
            <h2>Seus Quizzes</h2>
            <ion-icon class="create-a-new-quizz" name="add-outline" onclick="createANewQuizz()"></ion-icon>
        </nav>
        <div class="my-quizzes__with-quizz__links"></div>
    <div>
    `

    let linksQuizzes = document.querySelector('.my-quizzes__with-quizz__links')
    ALLQUIZZESLIST.forEach(quizz=>{
        if(idsQuizzesCreateds.indexOf(quizz.id) !== -1){
            linksQuizzes.innerHTML += `
            <figure id=${quizz.id} class="all-quizzes__list-quizzes__quizz" onclick="openThisQuizz(id)">
                <img src="${quizz.image}">
                <figcaption>${quizz.title}</figcaption>
            </figure>
            `      
        }

         
    })

    showElement('.my-quizzes__with-quizz')
}

function verifyIfWasQuizzesCreates(){
    if(localStorage['my-quizzes'] == undefined){
        showElement('.my-quizzes__no-quizz')

    }else{
        insertMyCreatedQuizzesOnThePage()
    }
    
}



// ============= main code =================== // 
insertQuizzesOnThePage('.all-quizzes__list-quizzes')

