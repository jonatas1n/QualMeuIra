const counter = document.getElementById('ira-counter') //Objeto com o contador do IRA
const icon = document.getElementById('icon')
const logo = document.getElementById('logo')
const openModal = document.getElementById('open-modal')

const loginArea = document.getElementById('login')

const templateMateria = document.getElementById('tpl-materia')

const addMateriaBtn = document.getElementById('add-materia') 
const nomeEl = document.getElementById('name-materia') 
const creditosEl = document.getElementsByName('creditos') 
const mencaoEl = document.getElementsByName('mencoes') 

const semestresArea = document.getElementById('semestres') 
const semestrePanelView = document.getElementById('semestrePanelView')

const proximoSemestreEl = document.getElementById('proximo-semestre')
const anteriorSemestreEl = document.getElementById('anterior-semestre')

const state = {
    semestre: 0,
    apaga: false
}

function alteraApaga(){
    state.apaga = !state.apaga
}

function proximoSemestre(){
    if (state.semestre == calculadoraIRA.semestres.length - 1){
        calculadoraIRA.newSemestre()
    }

    state.semestre++
    
    updateSemestre()
}

function anteriorSemestre(){
    if(state.semestre > 0){
        state.semestre--
        updateSemestre()
    }
}

function setIRA(){ // Função chamada para calcular o IRA e exibi-lo
    let ira = calculadoraIRA.ira()
    ira = ira.toFixed(4)
    counter.innerHTML = `<b>IRA: ${ira}</b>`
}

function updateSemestre(){
    var semestre = calculadoraIRA.semestres[state.semestre]

    semestrePanelView.innerHTML = `Semestre ${state.semestre + 1}`

    semestresArea.innerHTML = ''
    
    //Implementar template nessa fase
    semestre.materias.forEach(el => {
        gui.materia(el)
    })
}

addMateriaBtn.addEventListener('click', () => {
    var nome = nomeEl.value

    var mencao = Array.prototype.slice.call( mencaoEl, 0 );
    mencao = mencao.filter(elem => elem.checked)
    mencaoVal = mencao[0].id

    var creditos = Array.prototype.slice.call( creditosEl, 0 );
    creditos = creditos.filter(elem => elem.checked)
    creditosVal = creditos[0].value

    calculadoraIRA.addMateria(nome, creditosVal, mencaoVal, state.semestre);
    calculadoraIRA.calculaIRA();

    if(state.apaga) {
        nomeEl.value = ''
        mencao[0].checked = false
        creditos[0].checked = false
    }

    setIRA()
    updateSemestre()
})

calculadoraIRA.newSemestre()
setIRA();
updateSemestre()
logo.style.top = '10px'
logo.style.transform = 'rotate(-8deg)'
window.onload = function(){
    openModal.click()
}

proximoSemestreEl.addEventListener('click', proximoSemestre)
anteriorSemestreEl.addEventListener('click', anteriorSemestre)