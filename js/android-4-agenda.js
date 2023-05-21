function clearDataSelection() {
    var dataButtons = document.querySelectorAll('button[id="data-selected"]')
    for (var i = 0; i < dataButtons.length; i++) {
        dataButtons[i].classList.remove('selected')
    }
}

var dataButtons = document.querySelectorAll('button[id="data-selected"]')
for (var i = 0; i < dataButtons.length; i++) {
    dataButtons[i].addEventListener('click', function () {
        clearDataSelection()
        this.classList.add('selected')
    })
}

function clearBtnSelection() {
    var textButtons = document.querySelectorAll('button[id="text-selected"')
    for (var i = 0; i < textButtons.length; i++) {
        textButtons[i].classList.remove('selected')
    }
}

var textButtons = document.querySelectorAll('button[id="text-selected"]')
for (var i = 0; i < textButtons.length; i++) {
    textButtons[i].addEventListener('click', function () {
        clearBtnSelection()
        this.classList.add('selected')
    })
}