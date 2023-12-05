// 
function createIncorrectAnswers(element){
    for(let i=0; i<3; i++){
        element.innerHTML+=`
        <input type="text" placeholder="resposta incorreta ${i}">
        <input type="text" placeholder="URL da imagem">`
    }
}

function openAnswersConfig(element, numberQuestion){
    editClassElement('config-answer-box', 'level-box')

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


function createConfigAnswerBox(){
    let configAnswerBox = document.querySelector('.config-answer-box')
    configAnswerBox.innerHTML=''
    for(let i=0; i<3; i++){
        configAnswerBox.innerHTML += `
        <div class="level-box" style="cursor:pointer;" onclick="openAnswersConfig(this, ${i+1})">
            <h2>Nível ${i+1}</h2>
            <ion-icon name="create-outline"></ion-icon>
        </div>`
    }
    
    configAnswerBox.innerHTML += `<button class="quizz-creation-window__button">Prosseguir pra criar níveis</button>`
}




// creating levels
function openLevelsConfig(element, numberLevel){
    editClassElement('config-answer-box', 'level-box')

    element.innerHTML = `
    <div class="config-answer-box">
        <input type="text" placeholder="ads"></input>
        <input type="text" placeholder="a"></input>
        <input type="text" placeholder="as"></input>
        <input type="text" placeholder="ads"></input>
        <input style="height: 177px;" type="text" placeholder=""></input>
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


createConfigAnswerBox()
decideTheLevels()