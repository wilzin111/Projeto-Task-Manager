export default function fazerLogin() {
    var email = document.getElementById('Email').value
    var password = document.getElementById('senha').value

    // Obtém os perfis armazenados no localStorage
    var perfis = JSON.parse(localStorage.getItem('Perfis')) || []

    // Verifica se há um perfil com o email e a senha fornecidos
    var perfilEncontrado = perfis.find(function (perfil) {
        return perfil.email === email && perfil.password === password;
    })

    if (perfilEncontrado) {
        window.location.href = "android-3-home.html"
    } else {
        alert("Email ou senha inválidos")
    }
}

