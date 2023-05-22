function testLogado() {
    var estaLogado = localStorage.getItem("usuarioLogado")

    if (!estaLogado)
        window.location.href = "android-2-login.html"
}
testLogado()



// -----------------------------------------------------------------------------------------
var selectedDate = null;


function calendar() {
    var calendario = document.getElementById('calendarID');
    var dias = calendario.getElementsByClassName("cardClass");
    var dayDate = new Date();
    dayDate.setDate(dayDate.getDate() - 3);

    var meses = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    for (let i = 0; i < dias.length; i++) {
        var dia = dias[i];
        var getMes = meses[dayDate.getMonth()];
        var getDay = dayDate.getDate();
        dia.innerHTML = getMes + "<br>" + getDay;

        dayDate.setDate(getDay + 1);

        if (i >= 11) {
            break;
        }

        dia.addEventListener('click', function () {
            var year = this.getAttribute('data-year');
            var month = this.getAttribute('data-month');
            var day = this.getAttribute('data-day');

            if (day <= 9) {
                day = '0' + day
            }
            if (month <= 9) {
                month = '0' + month
            }
            compData = year + '-' + month + '-' + day
            var compData = localStorage.setItem('dataSelecionada', compData)
            showTascks()
        });

        dia.setAttribute('data-year', dayDate.getFullYear());
        dia.setAttribute('data-month', dayDate.getMonth() + 1);
        dia.setAttribute('data-day', dayDate.getDate() - 1);
    }
}


calendar()
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
    var textButtons = document.querySelectorAll('button[id="text-selected"]')
    for (var i = 0; i < textButtons.length; i++) {
        textButtons[i].classList.remove('selected-ativo')
    }
}

var textButtons = document.querySelectorAll('button[id="text-selected"]')
for (var i = 0; i < textButtons.length; i++) {
    textButtons[i].addEventListener('click', function () {
        clearBtnSelection()
        this.classList.add('selected-ativo')
    })
}


function showTascks() {
    let userActiv = localStorage.getItem("usuarioLogado");
    userActiv = JSON.parse(userActiv)

    var dataSelec = localStorage.getItem('dataSelecionada')
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var allDate = new Date()
    var dayDate = allDate.getDate()
    var mesDate = allDate.getMonth() + 1
    var year = allDate.getFullYear()
    if (dayDate <= 9) {
        dayDate = '0' + dayDate
    }
    if (mesDate <= 9) {
        mesDate = '0' + mesDate
    }

    var datecomp = year + '-' + mesDate + '-' + dayDate
    var getHour = allDate.getHours();

    if (getHour <= 9) {
        getHour = '0' + getHour
    }

    var getMinutes = allDate.getMinutes();
    if (getMinutes <= 9) {
        getMinutes = '0' + getMinutes
    }

    var hourPlusMinutes = getHour + ":" + getMinutes;
    let containerToDo = document.getElementById("toDo");
    let containerInProgress = document.getElementById("inProgress")
    let containerCompleted = document.getElementById("completed")

    containerToDo.innerHTML = ''
    containerInProgress.innerHTML = ''
    containerCompleted.innerHTML = ''

    var cont_completed = 0
    var cont_toDo = 0
    var cont_inProgress = 0
    var total_completed = 0
    var quantia_toDo = 0

    var getTasks = tasks.filter(function (task) {
        return task.email === userActiv.email;
    });

    getTasks.forEach(function (task) {
        var category = task.category;
        var date = task.date;
        var horaInicial = task.startTime;
        var horaFinal = task.endTime;
        var title = task.title;

        if (horaInicial < 12) {
            horaInicial += " am";
        } else {
            horaInicial += " pm";
        }
        if (horaFinal < 12) {
            horaFinal += " am";
        } else {
            horaFinal += " pm";
        }

        if (date > datecomp && date === dataSelec) {

            if (date === dataSelec) {
                let element = document.createElement("div");
                element.className = "test";
                element.innerHTML =
                    "<p>" +
                    category +
                    "</p>" +
                    "<h1>" +
                    title +
                    "</h1>" +
                    "<h2>" +
                    horaInicial +
                    " - " +
                    horaFinal +
                    "</h2>";
                containerToDo.appendChild(element);
            }
        }
        if (date < datecomp && date === dataSelec) {
            total_completed++
            if (date === dataSelec) {
                let element = document.createElement("div");
                element.className = "test";
                element.innerHTML =
                    "<p>" +
                    category +
                    "</p>" +
                    "<h1>" +
                    title +
                    "</h1>" +
                    "<h2>" +
                    horaInicial +
                    " - " +
                    horaFinal +
                    "</h2>";
                containerCompleted.appendChild(element);
            }
        }
        if (date === datecomp && date === dataSelec) {
            if (horaInicial > hourPlusMinutes) {
                cont_toDo++
                let element = document.createElement("div");
                element.className = "test";
                element.innerHTML =
                    "<p>" +
                    category +
                    "</p>" +
                    "<h1>" +
                    title +
                    "</h1>" +
                    "<h2>" +
                    horaInicial +
                    " - " +
                    horaFinal +
                    "</h2>";
                containerToDo.appendChild(element);
            }

            if (horaInicial <= hourPlusMinutes && horaFinal >= hourPlusMinutes) {
                cont_inProgress++
                let element = document.createElement("div");
                element.className = "test";
                element.innerHTML =
                    "<p>" +
                    category +
                    "</p>" +
                    "<h1>" +
                    title +
                    "</h1>" +
                    "<h2>" +
                    horaInicial +
                    " - " +
                    horaFinal +
                    "</h2>";
                containerInProgress.appendChild(element);
            }

            if (hourPlusMinutes > horaFinal) {
                cont_completed++
                let element = document.createElement("div");
                element.className = "test";
                element.innerHTML =
                    "<p>" +
                    category +
                    "</p>" +
                    "<h1>" +
                    title +
                    "</h1>" +
                    "<h2>" +
                    horaInicial +
                    " - " +
                    horaFinal +
                    "</h2>";
                containerCompleted.appendChild(element);
            }
        }

    })
    var totalTask = localStorage.getItem("totalTask")
    var qtdCompleted = totalTask - (cont_toDo + cont_inProgress)
    if (qtdCompleted < 0) {
        qtdCompleted = 0
    }
    localStorage.setItem('qtdCompleted', qtdCompleted)
    quantia_toDo = ((cont_toDo + cont_inProgress) / (cont_toDo + cont_inProgress + cont_completed)) * 100
    quantia_toDo = 100 - quantia_toDo

    localStorage.setItem("toDo", cont_toDo)
    localStorage.setItem("percentCompleted", parseFloat(quantia_toDo.toFixed(2)))
    localStorage.setItem("totalCompleted", cont_completed + total_completed)
}

function transferDisplay() {
    let classBtn = document.querySelectorAll(".container-btns button"); //btns
    var toDo = document.getElementById("toDo");  //
    var inProgress = document.getElementById("inProgress"); //
    var completed = document.getElementById("completed"); //container3

    classBtn.forEach(function (button) {
        button.addEventListener("click", function () {
            console.log(button.name);
            if (button.name === "toDo") {
                toDo.style.display = "flex";
                inProgress.style.display = "none";
                completed.style.display = "none";
            }
            if (button.name === "inProgress") {
                toDo.style.display = "none";
                inProgress.style.display = "flex";
                completed.style.display = "none";
            }
            if (button.name === "completed") {
                toDo.style.display = "none";
                inProgress.style.display = "none";
                completed.style.display = "flex";
            }
        });
    })
};
