let elementsOfStartAtTheBegin = {}

// =========== window start at the beginning ================= //
function proceedToCreateQuestions(element){
    element = element.parentNode
    let inputs = element.querySelectorAll('input')
    inputs.forEach(input => {
        elementsOfStartAtTheBegin[input.placeholder] = input.value
    });

    hideElement("."+element.classList[0])
    createConfigAnswerBox()

}



// ================== create your questions ================ //

function createIncorrectAnswers(element){
    for(let i=0; i<3; i++){
        element.innerHTML+=`
        <input type="text" id="incorrectAnswer${i+1}" placeholder="resposta incorreta ${i+1}">
        <input type="text" id="urlImage${i+1}" placeholder="URL da imagem">`
    }
}

function openAnswersConfig(element, numberQuestion){
    editClassElement(element, 'config-answer-box', 'level-box')
    element.onclick = null
    console.log(element)

    element.innerHTML = `
    <h2>Pergunta ${numberQuestion}</h2>
    <input type="text" placeholder="Texto da pergunta">
    <input type="text" placeholder="Cor de fundo da pergunta">

    <h2>Resposta correta</h2>
    <input type="text" placeholder="Resposta correta">
    <input type="text" placeholder="URL da imagem">
    
    <h2>Respostas incorretas</h2>
    `
    createIncorrectAnswers(element)
}

function createHeaderYourQuestions(){
    document.querySelector('.create-your-questions').classList.toggle('oculto')
}

function createConfigAnswerBox(){
    console.log(elementsOfStartAtTheBegin)

    createHeaderYourQuestions()

    let configAnswerBox = document.querySelector('.config-answer-box')
    configAnswerBox.innerHTML=''
 
    for(let i=0; i<elementsOfStartAtTheBegin['Quantidade de níveis do quizz']; i++){
        configAnswerBox.innerHTML += `
        <div class="level-box" style="cursor:pointer;" onclick="openAnswersConfig(this, ${i+1})">
            <h2>Nível ${i+1}</h2>
            <ion-icon name="create-outline"></ion-icon>
        </div>`
    }
    
    configAnswerBox.innerHTML += `<button class="quizz-creation-window__button">Prosseguir pra criar níveis</button>`
}




// ============= creating levels ===================== //
function openLevelsConfig(element, numberLevel){
    editClassElement(element, 'config-answer-box', 'level-box')
    element.onclick = null

    element.innerHTML = `
    <div class="config-answer-box">
        <input type="text" placeholder="Título do nível"></input>
        <input type="text" placeholder="% de acerto mínima"></input>
        <input type="text" placeholder="URL da imagem do nível"></input>
        <textarea placeholder="Descrição do nível"></textarea>
    </div>
    `
}


function createLevels(element){
    for(let i=0; i<3; i++){
        element.innerHTML+=`
        <div class="level-box" style="cursor:pointer;" onclick="openLevelsConfig(this, ${i+1})">
            <h2>Nível ${i+1}</h2>
            <ion-icon name="create-outline" role="img" class="md hydrated"></ion-icon>
        </div>`
    }    
}

function decideTheLevels(){
    let elementDecideTheLevels = document.querySelector('.decide-the-levels')
    elementDecideTheLevels.innerHTML += `
    <h2 class="title-box">Agora, decida os níveis</h2>`

    createLevels(elementDecideTheLevels)

    
}


decideTheLevels()