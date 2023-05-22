function testLogado() {
    var estaLogado = localStorage.getItem("usuarioLogado")

    if (!estaLogado)
        window.location.href = "android-2-login.html"
}
testLogado()

function passImgName() {
    var imgensUsuario = document.getElementById("img-usuario")
    var nameUsuario = document.getElementById("name-usuario")
    var photo = localStorage.getItem("usuarioLogado")
    photo = JSON.parse(photo)

    imgensUsuario.src = photo.foto
    nameUsuario.innerHTML = photo.usuario
}
passImgName()

function passValueCategory() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var usuarioLogado = localStorage.getItem("usuarioLogado")
    usuarioLogado = JSON.parse(usuarioLogado)

    const collegeText = document.getElementById("collegeText")
    const studyText = document.getElementById("studyText")
    const socialText = document.getElementById("socialText")
    const workText = document.getElementById("workText")
    const personalText = document.getElementById("personalText")
    const homeText = document.getElementById("homeText")
    var college = 0
    var work = 0
    var study = 0
    var social = 0
    var personal = 0
    var home = 0
    var totalTasks = 0
    // Filtra as tarefas do usuário logado
    var userTasks = tasks.filter(function (tasks) {
        return tasks.email === usuarioLogado.email
    });

    // Conta o número de tarefas em cada categoria
    userTasks.forEach(function (tasks) {
        var category = tasks.category

        if (category === "College stuff") {
            return college++;
        }
        if (category === "Study") {
            return study++;
        }
        if (category === "Work") {
            return work++;
        }
        if (category === "Social life") {
            return social++;
        }
        if (category === "Personal project") {
            return personal++;
        }
        if (category === "Home") {
            return home++;
        }

    });
    totalTasks = college + study + work + social + personal + home
    localStorage.setItem("totalTask", totalTasks)
    collegeText.innerHTML = college + " tasks"
    workText.innerHTML = work + " tasks"
    studyText.innerHTML = study + " tasks"
    personalText.innerHTML = personal + " tasks"
    socialText.innerHTML = social + " tasks"
    homeText.innerHTML = home + " tasks"
}
passValueCategory()

function funcBar() {
    var percentCompleted = localStorage.getItem('percentCompleted')
    var qtd = localStorage.getItem('toDo')
    var IDp = document.getElementById('porcentCompleted')
    var IDh1 = document.getElementById('qtdToDo')
    var bar = document.getElementById('barraCrescente')

    if (isNaN(percentCompleted) || percentCompleted == null) {
        IDp.innerHTML = 'No have tasks'
        bar.style.width = '0'
    } else {
        IDp.innerHTML = percentCompleted + '% complete'
        bar.style.width = percentCompleted + '%'
    }


    if (isNaN(qtd) || qtd == null) {
        IDh1.innerHTML = 'You no have tasks!'
    } else if (qtd === '0') {
        IDh1.innerHTML = 'You have no more tasks to do!'
    } else if (qtd === '1') {
        IDh1.innerHTML = 'You have ' + 1 + ' task to do!'
    } else {
        IDh1.innerHTML = 'You have ' + qtd + ' tasks to do!'
    }
}
funcBar()