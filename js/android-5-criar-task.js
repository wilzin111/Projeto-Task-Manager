// Função para salvar uma tarefa no localStorage
function saveTask() {

    var userLog = localStorage.getItem('usuarioLogado')
    userLog = JSON.parse(userLog)

    var atualDate = new Date().toISOString().split('T')[0];

    // Obtém os valores dos campos do formulário
    var title = document.getElementById('title').value
    var date = document.getElementById('date').value
    var startTime = document.getElementById('startTime').value
    var endTime = document.getElementById('endTime').value
    var category = getCategoryValue()
    var description = document.getElementById('description').value

    // Verifica se já existe uma tarefa com a mesma data e horário
    var tasks = JSON.parse(localStorage.getItem('tasks')) || []
    var duplicateTask = tasks.find(function (task) {
        return task.date === date && task.startTime === startTime
    })

    if (duplicateTask) {
        alert('Já existe uma tarefa no mesmo dia e horário!')
        return
    }

    // Cria um objeto para representar a tarefa
    var task = {
        email: userLog.email,
        title: title,
        date: date,
        startTime: startTime,
        endTime: endTime,
        category: category,
        description: description
    };

    // Adiciona a tarefa à lista de tarefas
    tasks.push(task)

    // Verificar se todos os campos, exceto a descrição, estão preenchidos
    if (title === '') {
        alert('Preencha o campo title!')
        return
    }
    if (date === '') {
        alert('Preencha o campo date!')
        return
    }
    if (startTime === '') {
        alert('Preencha o campo Start Time!')
        return
    }
    if (endTime === '') {
        alert('Preencha o campo End Time!')
        return
    }
    // Verificar se alguma categoria está selecionada
    if (category === '') {
        alert('Selecione uma categoria')
        return
    }

    if (startTime >= endTime) {
        alert('A hora final deve ser maior que a hora inicial!');
        return
    }

    if (date >= atualDate) {
        alert('A data não pode ser anterior à data atual!');
        return
    }

    // Salva a lista de tarefas no localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))

    // Limpa os campos do formulário
    document.getElementById('title').value = ''
    document.getElementById('date').value = ''
    document.getElementById('startTime').value = ''
    document.getElementById('endTime').value = ''
    clearCategorySelection()
    document.getElementById('description').value = ''

    alert('Tarefa salva com sucesso!')
}

// Função para obter o valor da categoria selecionada
function getCategoryValue() {
    var categoryButtons = document.querySelector('button[name="category"].selected')
    if (categoryButtons) {
        return categoryButtons.innerText.trim()

    }
    return ''
}

// Função para limpar a seleção da categoria
function clearCategorySelection() {
    var categoryButtons = document.querySelectorAll('button[name="category"]')
    for (var i = 0; i < categoryButtons.length; i++) {
        categoryButtons[i].classList.remove('selected')
    }
}

// Event listener para os botões de categoria
var categoryButtons = document.querySelectorAll('button[name="category"]')
for (var i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].addEventListener('click', function () {
        clearCategorySelection()
        this.classList.add('selected')
    })
}

// Função para limpar os campos do formulário
function clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('date').value = ''
    document.getElementById('startTime').value = ''
    document.getElementById('endTime').value = ''
    clearCategorySelection()
    document.getElementById('description').value = ''
}

function testLogado() {
    var estaLogado = localStorage.getItem("usuarioLogado")

    if (!estaLogado)
        window.location.href = "android-2-login.html"
}

testLogado()

// Botões para salvar e limpar os campos
document.getElementById('saveTask').addEventListener('click', saveTask)
document.getElementById('clearFields').addEventListener('click', clearFields)