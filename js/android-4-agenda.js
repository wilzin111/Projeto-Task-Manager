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



function showToDo() {
    let userLog = localStorage.getItem("UsuarioLogadoInfo");
    userLog = JSON.parse(userLog);

    var tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    var currentDate = new Date().toISOString().split("T")[0];
    var bruteDate = new Date();
    var currentHour = bruteDate.getHours();
    var currentMinutes = bruteDate.getMinutes();
    var hourAndMinutes = currentHour + ":" + currentMinutes;
    const container = document.getElementById("taskContainerId");

    var userTasks = tasks.filter(function (task) {
        return task.email === userLog.email;
    });
    userTasks.forEach(function (task) {
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
        if (date === currentDate) {
            if (horaInicial >= hourAndMinutes) {
                let element = document.createElement("div");
                element.className = "card-tasks";
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
                container.appendChild(element);
            }
        }
    });
}