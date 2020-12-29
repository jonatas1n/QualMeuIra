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
    counter.innerHTML = `IRA: ${ira}`

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
    console.log(semestre)

    semestrePanelView.innerHTML = `Semestre ${state.semestre + 1}`

    semestresArea.innerHTML = ''
    semestre.materias.forEach( el => {
        var li = document.createElement('li')
        var div = document.createElement('div')
        var dados = document.createElement('div')
        var options = document.createElement('div')
        var editBtn = document.createElement('button')
        var excludeBtn = document.createElement('button')

        li.classList.add('bg-light')
        li.classList.add('shadow')
        li.classList.add('rounded')
        li.classList.add('p-3')

        div.classList.add('row')

        dados.classList.add('d-flex')
        dados.classList.add('col-8')
        dados.classList.add('row')
        dados.style.gap = '20px'

        options.classList.add('col-4')
        options.style.justifyContent = 'space-around'
        options.style.placeItems = 'center'
        options.style.display = 'grid'
        options.style.gridTemplateColumns = 'auto auto'

        editBtn.classList.add('btn')
        editBtn.classList.add('btn-outline-dark')
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'
        editBtn.onclick = function() {
            nomeEl.innerHTML = el.nome
            nomeEl.value = el.nome
            
            var mencao = Array.prototype.slice.call( mencaoEl, 0 );
            mencao = mencao.filter(elem => elem.id == el.mencao)[0]
            mencao.checked = true

            var creditos = Array.prototype.slice.call( creditosEl, 0 );
            creditos = creditos.filter(elem => elem.value == el.creditos)[0]
            creditos.checked = true

            calculadoraIRA.delMateria(el.id)
            updateSemestre()
            calculadoraIRA.calculaIRA()
            setIRA()
        }
        
        excludeBtn.classList.add('btn')
        excludeBtn.classList.add('btn-outline-dark')
        excludeBtn.innerHTML = '<i class="fas fa-trash"></i>'
        excludeBtn.onclick = function(){
            calculadoraIRA.delMateria(el.id)
            updateSemestre()
            calculadoraIRA.calculaIRA()
            setIRA()
        }

        options.appendChild(editBtn)
        options.appendChild(excludeBtn)

        var h4 = document.createElement('h3')
        h4.classList.add('col-12')
        h4.style.textTransform = 'capitalize'
        h4.innerHTML = el.nome

        var p1 = document.createElement('h5')
        p1.classList.add('col-5')
        p1.innerHTML = `<h5><i class="fas fa-coins"></i> Créditos: <b>${el.creditos}</b></h5>`
        
        var p2 = document.createElement('h5')
        p2.classList.add('col-5')
        p2.innerHTML = `<h5><i class="fas fa-trophy"></i> Menção: <b>${el.mencao}</b></h5>`

        dados.appendChild(h4)
        dados.appendChild(p1)
        dados.appendChild(p2)
        div.appendChild(dados)
        div.appendChild(options)
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


    calculadoraIRA.addMateria(nome, creditosVal, mencaoVal, state.semestre);
    calculadoraIRA.calculaIRA();

    setIRA()
    updateSemestre()
})

calculadoraIRA.newSemestre()
setIRA();
updateSemestre()

proximoSemestreEl.addEventListener('click', function() {proximoSemestre()})
anteriorSemestreEl.addEventListener('click', function() {anteriorSemestre()})