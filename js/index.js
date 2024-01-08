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
        elementSelected.classList.remove('oculto')
    }
}

function thisSectionIsHidden(nameSection, className){
    let section = document.querySelector(nameSection)
    let theSectionContainTheClass = section.classList.contains(className)

    if (theSectionContainTheClass){return true}
    return false
}

function hiddenWindow(nameClassToHidden){
    
    let sectionMyQuizzNoQuizz = document.querySelector(nameClassToHidden)
    if(!thisSectionIsHidden(nameClassToHidden, 'oculto')){
        sectionMyQuizzNoQuizz.classList.add('oculto')
    }
}

function editClassElement(element, classToAdd, classToRemove){
    element.classList.add(classToAdd)
    element.classList.remove(classToRemove)
}

