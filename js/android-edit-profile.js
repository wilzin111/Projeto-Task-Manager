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

function atualizarPerfil() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    var imageSave = document.getElementById('img-perfil').src
    var nome = document.getElementById('Nome').value;
    var ocupacao = document.getElementById('Occupation').value;
    var senha = document.getElementById('Senha').value;

    if (nome.trim() === '') {
        alert('Adicione um nome');
        return;
    }

    if (ocupacao.trim() === '') {
        alert('Adicione uma ocupação');
        return;
    }

    if (!senhaValida(senha)) {
        alert('A senha deve ter pelo menos 6 caracteres, incluir pelo menos uma letra maiúscula, uma letra minúscula e um número.');
        return;
    }

    // Atualiza as informações no localStorage
    var usuarios = JSON.parse(localStorage.getItem('Perfis'));
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === usuarioLogado.email) {
            usuarios[i].foto = imageSave
            usuarios[i].usuario = nome
            usuarios[i].occupation = ocupacao
            usuarios[i].password = senha
            localStorage.setItem('Perfis', JSON.stringify(usuarios));
            break;
        }
    }

    alert('Perfil atualizado com sucesso!');
    window.location.href = 'android-2-login.html';

    // Limpa os campos do formulário
    document.getElementById('Nome').value = '';
    document.getElementById('Occupation').value = '';
    document.getElementById('Senha').value = '';
}

function senhaValida(senha) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(senha);
}