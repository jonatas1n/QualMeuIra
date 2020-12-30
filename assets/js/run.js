const modal = new bootstrap.Modal(document.getElementById('welcome'))
const modalEl = document.getElementById('welcome')

const counter = document.getElementById('ira-counter')
const icon = document.getElementById('icon')
const logo = document.getElementById('logo')

const loginArea = document.getElementById('login')

const form = document.getElementById('form-materia')

const templateMateria = document.getElementById('tpl-materia')

const historicoForm = document.getElementById('historico-form')
const historicoArea = document.getElementById('historico-area')
const nomeEl = document.getElementById('name-materia')
const creditosEl = document.getElementsByName('creditos')
const mencaoEl = document.getElementsByName('mencoes')
const addMateriaBtn = document.getElementById('add-materia')

const clearAllBtn = document.getElementById('clear-all-btn')

const semestresArea = document.getElementById('semestres')
const semestrePanelView = document.getElementById('semestrePanelView')

const proximoSemestreEl = document.getElementById('proximo-semestre')
const anteriorSemestreEl = document.getElementById('anterior-semestre')

const cookieObj = {}

const state = {
    semestre: 0,
    apaga: false,
    historico: false
}

function alteraApaga() {
    state.apaga = !state.apaga
}

function historico(){
    state.historico = !state.historico
    
    historicoArea.classList.toggle('bg-pink')
    historicoForm.classList.toggle('d-none')
}

function readCookie() {
    if(document.cookie.length > 0){
    var cookies = document.cookie.split(';')

        cookies = cookies.map(elem => elem.split('='))
        cookies.forEach(function (elem) {
            var list = elem[1].split('/')
            list = list.filter(elem => elem.length > 0)
            list = list.map(elem => elem.trim().split('|'))
            cookieObj[elem[0].trim()] = list
        })
    
        cookieObj['size'] = parseInt(cookieObj['size'][0])
    
        for (let i = 0; i < cookieObj['size']; i++) {
            calculadoraIRA.newSemestre()
            var dados = cookieObj['s' + i]
    
            if (dados) {
                dados.forEach(elem => {
                    calculadoraIRA.addMateria(elem[0], elem[1], elem[2], i)
                })
            }
        }
    
        updateSemestre()
    }
}

function proximoSemestre() {
    if (state.semestre == calculadoraIRA.semestres.length - 1) {
        calculadoraIRA.newSemestre()
    }

    state.semestre++

    updateSemestre()
}

function anteriorSemestre() {
    if (state.semestre > 0) {
        state.semestre--
        updateSemestre()
    }
}

function setIRA() { // Função chamada para calcular o IRA e exibi-lo
    let ira = calculadoraIRA.ira()
    ira = ira.toFixed(4)
    counter.innerHTML = `<b>IRA: ${ira}</b>`

    if(ira < 5){
        if(ira > 3){
            counter.classList.add('bg-sucess')
            counter.classList.remove('bg-danger')
            counter.classList.remove('bg-secondary')
        } else {
            counter.classList.add('bg-danger')
            counter.classList.remove('bg-sucess')
            counter.classList.remove('bg-secondary')
        }
    }
}

function cleanAll(){
    resultado = window.confirm('Você tem certeza que deseja limpar tudo?\n Você também excluirá os registros de matérias salvas na sua máquina')
    if(resultado){
        calculadoraIRA.cleanAll()
        updateSemestre()
    }
}

function updateSemestre() {
    var semestre = calculadoraIRA.semestres[state.semestre]
    semestre.materias = semestre.materias.reverse()

    semestrePanelView.innerHTML = `Semestre ${state.semestre + 1}`

    semestresArea.innerHTML = ''

    var cookie = ''

    semestre.materias.forEach(el => {
        gui.materia(el)
        cookie += `${el.nome}|${el.creditos}|${el.mencao}|${el.id}/`
    })

    document.cookie = `s${state.semestre}=${cookie}`
    document.cookie = `size=${calculadoraIRA.semestres.length}`

    setTimeout(function(){
        if(calculadoraIRA.semestres.length > 0){
            clearAllBtn.classList.remove('d-none')
        } else {
            clearAllBtn.classList.add('d-none')
        }
    }, 1000)
}

function showHeader() {
    logo.style.top = '10px'
    logo.style.transform = 'rotate(-8deg)'
    counter.style.opacity = '1'
}

addMateriaBtn.addEventListener('click', () => {
    var nome = nomeEl.value

    var mencao = Array.prototype.slice.call(mencaoEl, 0);
    mencao = mencao.filter(elem => elem.checked)
    mencaoVal = mencao[0].id

    var creditos = Array.prototype.slice.call(creditosEl, 0);
    creditos = creditos.filter(elem => elem.checked)
    creditosVal = creditos[0].value

    calculadoraIRA.addMateria(nome, creditosVal, mencaoVal, state.semestre);
    calculadoraIRA.calculaIRA();

    if (state.apaga) {
        nomeEl.value = ''
        mencao[0].checked = false
        creditos[0].checked = false
    }

    setIRA()
    updateSemestre()
})

modalEl.addEventListener('hide.bs.modal', showHeader)

proximoSemestreEl.addEventListener('click', proximoSemestre)
anteriorSemestreEl.addEventListener('click', anteriorSemestre)

calculadoraIRA.newSemestre()
readCookie()
calculadoraIRA.calculaIRA()
setIRA();
window.onload = modal.show()