function salvar() {
    salvarPerfil()
}

const photo = document.getElementById('img-perfil')
const file = document.getElementById('FlImage')

photo.addEventListener('click', () => {
    file.click()
})

file.addEventListener('change', () => {

    if (file.files.length <= 0) {
        return
    }

    const leitor = new FileReader()

    leitor.onload = () => {
        photo.src = leitor.result
    }

    leitor.readAsDataURL(file.files[0])

})

function salvarPerfil() {
    // Obtém o valor do campo de e-mail
    var emailSave = document.getElementById('Email').value
    var imageSave = document.getElementById('FlImage').value
    var nameSave = document.getElementById('Nome').value
    var occupationSave = document.getElementById('Occupation').value
    var passwordSave = document.getElementById('Senha').value

    // Expressão regular para verificar o formato do e-mail
    var verificationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Verifica se o e-mail está correto
    if (!verificationEmail.test(emailSave)) {
        alert("E-mail incorreto")
        return
    }

    // Verifica se o e-mail já existe no localStorage
    var perfisS = JSON.parse(localStorage.getItem('Perfis')) || []
    for (var i = 0; i < perfisS.length; i++) {
        if (perfisS[i].email === emailSave) {
            alert("E-mail já cadastrado")
            return;
        }
    }

    //Verificação da senha

    var verificationPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/
    if (!verificationPassword.test(passwordSave)) {
        alert("Senha não aceita, digite pelo menos um letra minuscula, uma letra maiúscula e um numero");
        return
    }
    if (passwordSave.length < 6) {
        alert("Senha não aceita, deve conter no minimo 6 caracteres")
        return
    }

    // Verifica se o campo de ocupação está vazio

    if (nameSave.trim() === "") {
        alert("Adicione um nome")
        return
    }


    if (occupationSave.trim() === "") {
        alert("Adicione um ocupação")
        return
    }

    // Cria um novo perfil
    var novoPerfil = {
        foto: imageSave,
        usuario: nameSave,
        occupation: occupationSave,
        email: emailSave,
        password: passwordSave,

    };

    // Adiciona o novo perfil aos perfis existentes
    perfisS.push(novoPerfil)

    // Salva os perfis atualizados no localStorage
    localStorage.setItem('Perfis', JSON.stringify(perfisS))

    alert("Perfil salvo com sucesso!")

    window.location.href = "android-2-login.html"
    //Remove os dados dos inputs

    document.getElementById('Email').value = ""
    document.getElementById('Nome').value = ""
    document.getElementById('Occupation').value = ""
    document.getElementById('Senha').value = ""
}