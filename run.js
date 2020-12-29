var counter = document.getElementById('ira-counter') //Objeto com o contador do IRA
var addMateriaBtn = document.getElementById('add-materia') //Botão para adicionar matéria ao semestre
var nomeEl = document.getElementById('nome-materia') //Elemento com o input do nome da matéria
var creditosEl = document.getElementsByName('creditos') //Elemento com o input dos créditos da matéria
var mencaoEl = document.getElementsByName('mencoes') //Elemento com o input da menção da matéria

var semestresArea = document.getElementById('semestres') //Área onde serão adicionados as matérias
var semestrePanelView = document.getElementById('semestrePanelView')

var proximoSemestreEl = document.getElementById('proximo-semestre')
var anteriorSemestreEl = document.getElementById('anterior-semestre')

const state = {
    semestre: 0
}

function proximoSemestre(){
    console.log('works')
    if(state.semestre < calculadoraIRA.semestres.length - 1){
        calculadoraIRA.newSemestre()
    }
    semestre++
    
    updateSemestre()
}

function anteriorSemestre(){
    if(state.semestre > 0){
        semestre--
        updateSemestre()
    }
}

function setIRA(){ // Função chamada para calcular o IRA e exibi-lo
    let ira = calculadoraIRA.ira()
    counter.innerHTML = `IRA: ${ira}/5`

    if(ira < 3){
        counter.classList.remove('bg-success')
        counter.classList.add('bg-danger')
    } else {
        counter.classList.add('bg-success')
        counter.classList.remove('bg-danger')
    }
}

function updateSemestre(){
    var semestre = calculadoraIRA.semestres[state.semestre]

    semestrePanelView.innerHTML = `Semestre ${state.semestre + 1}`

    semestresArea.innerHTML = ''
    semestre.materias.forEach( el => {
        var li = document.createElement('li')
        var div = document.createElement('div')
        li.classList.add('bg-light')
        li.classList.add('shadow')
        li.classList.add('rounded')
        li.classList.add('p-3')
        div.style.display = 'flex'
        div.style.gap = '20px'

        var h4 = document.createElement('h3')
        // h4.style.display = 'flex'
        h4.innerHTML = el.nome

        var p1 = document.createElement('span')
        p1.innerHTML = `<h5>Créditos: <b>${el.creditos}</b></h5>`
        
        var p2 = document.createElement('p')
        p2.innerHTML = `<h5>Menção: <b>${el.mencao}</b></h5>`

        div.appendChild(h4)
        div.appendChild(p1)
        div.appendChild(p2)
        li.appendChild(div)

        semestresArea.appendChild(li)
    } )
}

addMateriaBtn.addEventListener('click', () => {
    var nome = nomeEl.value

    var mencao = Array.prototype.slice.call( mencaoEl, 0 );
    mencao = mencao.filter(elem => elem.checked)
    mencaoVal = mencao[0].id

    var creditos = Array.prototype.slice.call( creditosEl, 0 );
    creditos = creditos.filter(elem => elem.checked)
    creditosVal = creditos[0].value


    calculadoraIRA.addMateria(nome, creditosVal, mencaoVal);
    calculadoraIRA.calculaIRA();

    setIRA()
    updateSemestre()
})

calculadoraIRA.newSemestre()
setIRA();
updateSemestre()

proximoSemestreEl.addEventListener('click', proximoSemestre())
anteriorSemestreEl.addEventListener('click', anteriorSemestre())