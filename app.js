calculadoraIRA = {
    semestres: [],
    mencoes: ['SR', 'II', 'MI', 'MM', 'MS', 'SS'],
    valX: 0,
    valY: 0,
    semestreID: 0,
    materiaID: 0,

    ira() {
        if(this.semestres.length == 1 && this.semestres[0].length == 0) return 5.00
        else{
            // this.calculaIRA()
            return this.valX / this.valY
        }
    },

    newSemestre(){
        this.semestres.push({
            id: this.semestreID,
            materias: []
        })

        this.semestreID++
    },

    calculaIRA(){
        this.semestres.forEach( semestre => {
            console.log(semestre)
            semestre.materias.forEach( ({mencao, creditos}, it) => {
                this.valX += this.mencoes.indexOf(mencao) * creditos * (it + 1)
                this.valY += creditos * (it + 1)
                console.log('IRA: ', this.ira())
            })
        });
    },

    addMateria(nome, creditos, mencao){
        var materia = {
            id: this.materiaID,
            nome: nome,
            creditos: creditos,
            mencao: mencao
        }

        this.materiaID++

        if(this.semestres.length == 0) this.newSemestre()

        this.semestres[this.semestres.length - 1].materias.push(materia)
    }

}