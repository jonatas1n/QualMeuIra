const calculadoraIRA = {
    semestres: [],
    mencoes: ['SR', 'II', 'MI', 'MM', 'MS', 'SS'],
    initialValX: 0, // Parâmetro de cálculo para o IRA
    initialValY: 0, // Parâmetro de cálculo para o IRA
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
        this.valX = this.initialValX
        this.valY = this.initialValY
        
        this.semestres.forEach( (semestre, it) => {
            if (it > 5) it = 5
            
            semestre.materias.forEach( ({mencao, creditos}) => {
                this.valX += mencao * creditos * (it + 1)
                this.valY += creditos * (it + 1)
            })
        });
    },

    addMateria(nome, creditos, mencao, sem, pos){
        var materia = {
            id: this.materiaID,
            nome: nome,
            creditos: creditos,
            mencao: mencao
        }
        
        this.materiaID++
        
        if(this.semestres.length == 0) this.newSemestre()
        
        if(pos) this.semestres[sem].materias.push(materia)
        else this.semestres[sem].materias.unshift(materia)
    },

    delMateria(ID){
        this.semestres.forEach( ({id, materias}) => {
            for(let i = 0; i < materias.length; i++){
                if(materias[i].id == ID) {
                    materias.splice(i, 1)
                    return
                }
            }
        } )
    },

    clear(){
        this.semestres = []
        this.valX = this.initialValX
        this.valY = this.initialValY
        this.semestreID = 0
        this.materiaID = 0
    },

    previsao(ira, fields){
        var newValY = 0

        fields.forEach( (elem, it) => {
            if( it > 5 ) it = 5
            newValY += elem * (it + 1)
        } )

        this.initialValX = ira * newValY
        this.initialValY = newValY
        this.calculaIRA()
    },

    zeraPrevisao(){
        this.initialValX = 0
        this.initialValY = 0
        this.valX = 0
        this.valY = 0
    }

}