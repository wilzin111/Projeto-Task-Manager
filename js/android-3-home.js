function passImgName() {
    var imgensUsuario = document.getElementById("img-usuario")
    var nameUsuario = document.getElementById("name-usuario")
    var photo = localStorage.getItem("usuarioLogado")
    photo = JSON.parse(photo)

    imgensUsuario.src = photo.foto
    nameUsuario.innerHTML = photo.usuario
}

function testLogado() {
    var estaLogado = localStorage.getItem("usuarioLogado")

    if (!estaLogado)
        window.location.href = "android-2-login.html"
}

testLogado()
passImgName()