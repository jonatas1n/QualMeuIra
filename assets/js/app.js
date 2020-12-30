calculadoraIRA = {
    semestres: [],
    mencoes: ['SR', 'II', 'MI', 'MM', 'MS', 'SS'],
    valX: 0, // Parâmetro de cálculo para o IRA
    valY: 0, // Parâmetro de cálculo para o IRA
    semestreID: 0,
    materiaID: 0,

    ira() { // Função que retorna o valor o IRA
        if(this.valX == this.valY && this.valY == 0) return 5.0
        return this.valX / this.valY
    },

    newSemestre(){ // Função que insere um novo semestre na lista de semestres
        this.semestres.push({
            id: this.semestreID,
            materias: []
        })

        this.semestreID++
    },

    calculaIRA(){ // Função que faz a leitura de todos os semestres registrados e calcula ou atualiza os parâmetros para o cálculo  do IRA
        this.valX = 0
        this.valY = 0
        
        this.semestres.forEach( semestre => {
            semestre.materias.forEach( ({mencao, creditos}, it) => {
                this.valX += this.mencoes.indexOf(mencao) * creditos * (it + 1)
                this.valY += creditos * (it + 1)
            })
        });
    },

    addMateria(nome, creditos, mencao, pos){ // Função que insere uma nova matéria no semestre
        var materia = {
            id: this.materiaID,
            nome: nome,
            creditos: creditos,
            mencao: mencao
        }

        this.materiaID++

        if(this.semestres.length == 0) this.newSemestre()

        this.semestres[pos].materias.push(materia)
    },

    delMateria(ID){
        this.semestres.forEach( ({id, materias}) => {
            for(let i = 0; i < materias.length; i++){
                if(materias[i].id == ID) {
                    materias.splice(i)
                    return
                }
            }
        } )
    },

    cleanAll(){
        this.semestres = []
        this.valX = 0
        this.valY = 0
        this.semestreID = 0
        this.materiaID = 0
    }

}