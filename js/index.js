function hideElement(classElement){
    let elementSelected = document.querySelector(classElement)
    let isNotOcultoInTheClassElement = !elementSelected.classList.contains('oculto')
    if (isNotOcultoInTheClassElement){
        elementSelected.classList.add('oculto')
    }
}

function showElement(classElement){
    let elementSelected = document.querySelector(classElement)
    let isOcultoInTheClassElement = elementSelected.classList.contains('oculto')
    if (isOcultoInTheClassElement){
        elementSelected.classList.add('oculto')
    }
}