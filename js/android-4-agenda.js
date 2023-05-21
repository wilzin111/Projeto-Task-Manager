function testLogado() {
    var estaLogado = localStorage.getItem("usuarioLogado")

    if (!estaLogado)
        window.location.href = "android-2-login.html"
}

testLogado()

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

function calendar() {
    var calendario = document.getElementById('calendarID')
    var dias = calendario.getElementsByClassName("cardClass")
    let dayDate = new Date()
    dayDate.setDate(dayDate.getDate() - 3)

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
    ]

    for (let i = 0; i < dias.length; i++) {
        var dia = dias[i];
        var getMes = meses[dayDate.getMonth()]
        var getDay = dayDate.getDate()
        dia.innerHTML = getMes + "<br>" + getDay

        dayDate.setDate(getDay + 1)

        if (i >= 11) {
            break
        }
    }

}
calendar()


function showTascks() {
    let userActiv = localStorage.getItem("usuarioLogado");
    userActiv = JSON.parse(userActiv);

    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var dayDate = new Date().toISOString().split("T")[0];
    var allDate = new Date();
    var getHour = allDate.getHours();
    var getMinutes = allDate.getMinutes();
    var hourPlusMinutes = getHour + ":" + getMinutes;
    const containerToDo = document.getElementById("toDo");
    const containerInProgress = document.getElementById("inProgress")
    const containerCompleted = document.getElementById("completed")
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

        if (date === dayDate) {
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
        if (date > dayDate) {
            if (date === dayDate) {
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

        if (date < dayDate) {
            total_completed++
            if (date === dayDate) {
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
    quantia_toDo = ((cont_toDo + cont_inProgress) / (cont_toDo + cont_inProgress + cont_completed)) * 100
    quantia_toDo = 100 - quantia_toDo

    localStorage.setItem("toDo", cont_toDo)
    localStorage.setItem("percentCompleted", quantia_toDo)
    localStorage.setItem("totalCompleted", cont_completed + total_completed)
}
showTascks()
