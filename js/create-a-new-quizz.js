let elementsOfStartAtTheBegin = {}
let questionsInformations = []
let questionsLevelsInformations = []
let myQuizzesCreateds = JSON.parse(localStorage.getItem('my-quizzes'))
let localId = null

// =========== window start at the beginning ================= //
function proceedToCreateQuestions(element){
    element = element.parentNode
    let inputs = element.querySelectorAll('input')
    let confirm = true

    inputs.forEach(input => {
        if (input.value.length > 2497){
            alert(`o elemento "${input.placeholder}" é muito grande. substitua por outro menor`)
            confirm = false
        }else if(input.value.length<1){
            alert(`o elemento "${input.placeholder}" está vazio`)
            confirm = false
        }

        elementsOfStartAtTheBegin[input.placeholder] = input.value
    });

    if (confirm){
        hideElement("."+element.classList[0])
        createQuestions()
    }

}

// ================== creating questions ================ //

function saveQuestionsInformations(element){
    let boxQuestions = element.querySelectorAll('.config-answer-box')
    
    for (let i = 0; i < boxQuestions.length; i++) {
        let temporaryDataQuestions = {}
        let inputs = boxQuestions[i].querySelectorAll('input')
        
        for(let i2=0; i2<inputs.length; i2++){    
            if(inputs[i2].value.length < 1){
                alert(`O elemento "${inputs[i2].placeholder}" está vazio`)
                return false
            }else if(inputs[i2].value.length > 297 ){
                alert(`O elemento "${inputs[i2].placeholder}" é muito grande. Substitua por outro menor`)
                return false
            }


            temporaryDataQuestions[inputs[i2].placeholder] = inputs[i2].value 
        }
        questionsInformations.push(temporaryDataQuestions)
    }

    return true

}

function SaveQuestionsAndCallTheLevelBox(element){

    element = element.parentNode

    let allElementsIsOk = saveQuestionsInformations(element)
    
    if(allElementsIsOk){
        hiddenWindow('.create-your-questions')
        decideTheLevels()
    }
}

function createIncorrectAnswers(element){
    for(let i=0; i<3; i++){
        element.innerHTML+=`
        <input type="text" id="incorrectAnswer${i+1}" placeholder="resposta incorreta ${i+1}">
        <input type="text" id="urlImage${i+1}" placeholder="URL da imagem ${i+1}">`
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
        let textareas = boxQuestions[i].querySelector('textarea')


        for(let i2=0; i2<inputs.length; i2++){
            if(inputs[i2].value.length > 2497){
                alert(`O elemento "${inputs[i2].placeholder}" está vazio`)
                return false
            }else if(inputs[i2].value.length <1){
                alert(`O elemento "${inputs[i2].placeholder}" é muito grande, substitua por outro menor`)
                return false
            }
            temporaryDataQuestions[inputs[i2].placeholder] = inputs[i2].value 
        }
        temporaryDataQuestions[textareas.placeholder] = textareas.value
        questionsLevelsInformations.push(temporaryDataQuestions)
    }
    return true

}

function saveLevelsAndCallTheFinishPage(element){
    element = element.parentNode
    let allElementsIsOk = saveLevelInformation(element)
    if(allElementsIsOk){
        hiddenWindow('.'+element.classList[0])
        sendToServer()
    }
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
function windowCreatedQuizz(){
    let yourQuizzWasCreated = document.querySelector('.your-quizz-was-created')
    showElement('.your-quizz-was-created')
    yourQuizzWasCreated.innerHTML+= `
    <h2 style="margin-top: 39px; margin-bottom: 29px;">Seu quizz está pronto!</h2>

    <figure style="width: 340px; height: 181px;">
        <img style="margin-bottom: 24px;" src="${elementsOfStartAtTheBegin['URL da imagem do seu quizz']}">
        <figcaption style="position: absolute; bottom: 8px; left: 8px">${elementsOfStartAtTheBegin['Título do seu quizz']}</figcaption>
    </figure>

    <button onclick="openThisQuizz(${localId})" class="results__restart-button">Acessar quizz</button>
    <button onclick="window.location.reload()" class="results__reset-button">Voltar para home</button>
    `
}

function saveQuizz(info){
    if(!myQuizzesCreateds){
        myQuizzesCreateds = []
    }
    console.log(info.data)
    myQuizzesCreateds.push(info.data.id)
    localStorage.setItem('my-quizzes', JSON.stringify(myQuizzesCreateds))
    localId = info.data.id
}

function showError(erro){
    console.log(erro)
}


function returnLevelQuestions(){
    let listLevels =[]
    
    questionsLevelsInformations.forEach(level=>{
        let temporaryLevels = {}
        temporaryLevels['title'] = level['Título do nível']
        temporaryLevels['image'] = level['URL da imagem do nível']
        temporaryLevels['text'] = level['Descrição do nível']
        temporaryLevels['minValue'] = level['% de acerto mínima']
        listLevels.push(temporaryLevels)
    })

    return listLevels
}


function returnListQuestions(){
    let listQuestions = []
    
    questionsInformations.forEach(question =>{
        let questionsElements = {}
        questionsElements['title'] = question['Texto da pergunta']
        questionsElements['color'] = question['Cor de fundo da pergunta']
        questionsElements['answers'] = [
            {   
                text: question['Resposta correta'],
                image: question['URL da imagem'],
                isCorrectAnswer: true,
            },
            {
                text: question['resposta incorreta 1'],
                image: question['URL da imagem 1'],
                isCorrectAnswer: false,
            },
            {
                text: question['resposta incorreta 2'],
                image: question['URL da imagem 2'],
                isCorrectAnswer: false,
            },
            {
                text: question['resposta incorreta 3'],
                image: question['URL da imagem 3'],
                isCorrectAnswer: false,
            },
        ]

        listQuestions.push(questionsElements)
        
    })

    return listQuestions
}
    

function sendToServer(){
    let questions = returnListQuestions()
    let levels = returnLevelQuestions()

    elementsToPush =    {
        title: elementsOfStartAtTheBegin['Título do seu quizz'],
        image: elementsOfStartAtTheBegin['URL da imagem do seu quizz'],
        questions: questions,
        levels: levels
    }

        // let informationAboutTheSending = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', elementsToPush)
        // informationAboutTheSending.then(saveQuizz)
        // informationAboutTheSending.catch(showError)

    windowCreatedQuizz()

}


function teste(){   
    let elementTest = {
        title: "Você conhece o vasco?",
        image: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3454.png",
        questions: [
            {
                title: "Quem é o maior artilheiro da história do Vasco da Gama?",
                color: "#3fe716",
                answers: [
                    {
                        text: "Roberto Dinamite",
                        image: "https://i.superesportes.com.br/m9JFu7dYePANOG2vepde_HCl4fM=/1200x900/smart/imgsapp.mg.superesportes.com.br/app/noticia_126420360808/2023/01/08/3985546/roberto-dinamite-comemora-gol-pelo-vasco_1_53093.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Edmundo",
                        image: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2020/05/29/58592ce5cc2cc.jpeg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Romário",
                        image: "https://conteudo.imguol.com.br/c/esporte/96/2020/07/28/romario-em-acao-pelo-vasco-em-partida-contra-o-gama-pela-copa-joao-havelange-em-2000-1595957609730_v2_1x1.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Juninho Pernambucano",
                        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5yvyMElonmXkc4JAxq1STtKsEQsuJIrjbQ&usqp=CAU",
                        isCorrectAnswer: false
                        
                    }, 
                ]
            },
            {
                title: "Qual estádio é conhecido como a casa do Vasco da Gama?",
                color: "#37572f",
                answers: [
                    {
                        text: "Estádio São Januário",
                        image: "https://s2-ge.glbimg.com/LjDlYJ2X1BABpblbmu0IgdbWweg=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/r/b/qzVMvBTOAiyiJguu5r8Q/sao-januario-4-foto.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Estádio do Maracanã",
                        image: "https://imagens.ebc.com.br/pfvme-yPKPipeKJZPk02DK3diCU=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/estadio_do_maracana2002140424.jpg?itok=kuNV9JxX",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Arena da Amazônia",
                        image: "https://www.amazonasincrivel.com/wp-content/uploads/2021/12/15E21D92-EDB6-4140-B8F2-BCFD547BE164.jpeg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Estádio Nilton Santos",
                        image: "https://img.r7.com/images/estadio-nilton-santos-e-a-casa-do-botafogo-14102022164135207?dimensions=771x420&&&resize=771x420&crop=800x436+0+124",
                        isCorrectAnswer: false
                    },
                    
                ]
            },
            {
                title: "Em que ano o Vasco da Gama conquistou a Libertadores da América pela primeira vez?",
                color: "#c3ce2e",
                answers: [
                    {
                        text: "1948",
                        image: "https://static3.tcdn.com.br/img/img_prod/311840/trofeu_taca_libertadores_premium_38cm_107300_6_bce1636e1636328e62deb82bb8f2a5ff.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "2000",
                        image: "https://static3.tcdn.com.br/img/img_prod/311840/trofeu_taca_libertadores_premium_38cm_107300_6_bce1636e1636328e62deb82bb8f2a5ff.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "1998",
                        image: "https://static3.tcdn.com.br/img/img_prod/311840/trofeu_taca_libertadores_premium_38cm_107300_6_bce1636e1636328e62deb82bb8f2a5ff.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "2012",
                        image: "https://static3.tcdn.com.br/img/img_prod/311840/trofeu_taca_libertadores_premium_38cm_107300_6_bce1636e1636328e62deb82bb8f2a5ff.jpg",
                        isCorrectAnswer: false
                    },
                    
                ]
            }
        ],
        levels: [
            {
                title: "Você já assistiu algum jogo do vasco???",
                image: "https://www.galaticosonline.com/fotos/noticias/101586/mg/diniz.jpg",
                text: "Parece que você não conhece nenhum pouquinho o vascão",
                minValue: 34
            },
            {
                title: "você sabe tudo sobre o vasco!!!",
                image: "https://img.r7.com/images/cano-vasco-taca-rio-2021-22052021175139801?dimensions=677x369",
                text: "Você poderia facilmente escrever um livro sobre o vasco",
                minValue: 50
            }
        ]
    }
    let informationAboutTheSending = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', elementTest)
        informationAboutTheSending.then(showInformation)
        informationAboutTheSending.catch(showError)    
}
