let elementsOfStartAtTheBegin = {}
let questionsInformations = []
let questionsLevelsInformations = []

// =========== window start at the beginning ================= //
function proceedToCreateQuestions(element){
    element = element.parentNode
    let inputs = element.querySelectorAll('input')
    inputs.forEach(input => {
        elementsOfStartAtTheBegin[input.placeholder] = input.value
    });

    hideElement("."+element.classList[0])
    createQuestions()

}

// ================== creating questions ================ //

function saveQuestionsInformations(element){
    let boxQuestions = element.querySelectorAll('.config-answer-box')


    for (let i = 0; i < boxQuestions.length; i++) {
        let temporaryDataQuestions = {}
        let inputs = boxQuestions[i].querySelectorAll('input')
        
        for(let i2=0; i2<inputs.length; i2++){
            temporaryDataQuestions[inputs[i2].placeholder] = inputs[i2].value 
        }

        questionsInformations.push(temporaryDataQuestions)
    }
}

function SaveQuestionsAndCallTheLevelBox(element){

    element = element.parentNode

    saveQuestionsInformations(element)
    hiddenWindow('.create-your-questions')
    decideTheLevels()
}

function createIncorrectAnswers(element){
    for(let i=0; i<3; i++){
        element.innerHTML+=`
        <input type="text" id="incorrectAnswer${i+1}" placeholder="resposta incorreta ${i+1}">
        <input type="text" id="urlImage${i+1}" placeholder="URL da imagem">`
    }
}

function openQuestionOptions(element, numberQuestion){
    editClassElement(element, 'config-answer-box', 'question-box')
    element.onclick = null

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

function createQuestions(){
    showElement('.create-your-questions')
    let configAnswerBox = document.querySelector('.config-answer-box')
    configAnswerBox.innerHTML=''

    for(let i=0; i<elementsOfStartAtTheBegin['Quantidade de perguntas do quizz']; i++){
        configAnswerBox.innerHTML += `
        <div class="question-box" style="cursor:pointer;" onclick="openQuestionOptions(this, ${i+1})">
            <h2>Pergunta ${i+1}</h2>
            <ion-icon name="create-outline"></ion-icon>
        </div>`
    }
    
    configAnswerBox.innerHTML += `<button class="quizz-creation-window__button" onclick="SaveQuestionsAndCallTheLevelBox(this)">Prosseguir pra criar níveis</button>`
}


// ============= creating levels ===================== //

function saveLevelInformation(element){
    let boxQuestions = element.querySelectorAll('.config-answer-box')
    for (let i = 0; i < boxQuestions.length; i++) {
        let temporaryDataQuestions = {}
        let inputs = boxQuestions[i].querySelectorAll('input')
        
        for(let i2=0; i2<inputs.length; i2++){
            temporaryDataQuestions[inputs[i2].placeholder] = inputs[i2].value 
        }

        questionsLevelsInformations[`Level ${i}`] = temporaryDataQuestions
    }

}

function saveLevelsAndCallTheFinishPage(element){
    element = element.parentNode
    saveLevelInformation(element)
    hiddenWindow('.'+element.classList[0])
    sendToServer()
}


function openLevelsConfig(element, numberLevel){
    editClassElement(element, 'config-answer-box', 'level-box')
    element.onclick = null

    element.innerHTML = `
        <input type="text" placeholder="Título do nível"></input>
        <input type="text" placeholder="% de acerto mínima"></input>
        <input type="text" placeholder="URL da imagem do nível"></input>
        <textarea placeholder="Descrição do nível"></textarea>
    `
}


function createLevels(element){
    for(let i=0; i<elementsOfStartAtTheBegin['Quantidade de níveis do quizz']; i++){
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
    elementDecideTheLevels.innerHTML += `<button class="quizz-creation-window__button" onclick="saveLevelsAndCallTheFinishPage(this)">Finalizar Quizz</button>`

}

// ============ saving quizz in the cloud ============= //

function sendToServer(){
    console.log(elementsOfStartAtTheBegin)
    console.log(questionsInformations)
    console.log(questionsLevelsInformations)

    questionsInformations.forEach(question =>{
        
    })



    {
        title = elementsOfStartAtTheBegin['Título do seu quizz'],
        image = elementsOfStartAtTheBegin['URL da imagem do seu quizz'],
        questions = [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    }

}