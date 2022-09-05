const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')


function criaLi() {
    const li = document.createElement('li'); // cria ista
    return li; // retorna a lista
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) { //buscando a tecla ENTER
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
});


function criaBotaoApagar(li) {
    li.innerHTML += ' '; // Espaçamento na lista para o botao
    const botaoApagar = document.createElement('button'); // criando o botao de apagar 
    botaoApagar.innerHTML = 'apagar'; //selecionando o valor do botão
    botaoApagar.setAttribute('class', 'apagar') // criando uma classe para o botao
    botaoApagar.setAttribute('title', 'apagar-tarefa') //
    li.appendChild(botaoApagar);

}
function limpaInput() {
    inputTarefa.value = ''; //limpando 
    inputTarefa.focus(); // retornando ao input
}


function criaTarefa(textoInput) {
    const li = criaLi() //variavel que busca a função que criou a lista
    li.innerText = textoInput
    tarefas.appendChild(li); //adicionando li a tag ul
    limpaInput(); // retornando função para apagar o input
    criaBotaoApagar(li); //retornando função para botao de apagar
    salvarTarefas(); // retornando função para salvar a lista
}
btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;  // Se estiver vazio
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function (e) {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson)
}
function AdicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}
AdicionaTarefasSalvas()