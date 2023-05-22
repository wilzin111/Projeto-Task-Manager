function testLogado() {
    var estaLogado = localStorage.getItem("usuarioLogado")

    if (!estaLogado)
        window.location.href = "android-2-login.html"
}

testLogado()

function passImgName() {
    var imgensUsuario = document.getElementById("img-usuario")
    var nameUsuario = document.getElementById("name-usuario")
    var occupationUsuario = document.getElementById("occupation-usuario")
    var photo = localStorage.getItem("usuarioLogado")
    photo = JSON.parse(photo)

    imgensUsuario.src = photo.foto
    nameUsuario.innerHTML = photo.usuario
    occupationUsuario.innerHTML = photo.occupation
}
passImgName()

function logOut() {
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'android-2-login.html'
}

function qtdTask() {
    var completed = localStorage.getItem('totalCompleted')
    var idH1 = document.getElementById('qtd-tasks')
    var idp = document.getElementById('trueOrFalse')
    console.log(completed);
    if (completed == 0) {
        idp.innerHTML = 'Sorry!'
        idH1.innerHTML = 'you do not have complete tasks'
    } else {
        idp.innerHTML = 'Amazing!'
        idH1.innerHTML = 'You have completed ' + completed + ' task!'
    }


}

qtdTask()