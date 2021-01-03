const cookie = {
    obj: {},

    
    readCookie: function(){
        if (document.cookie.length > 0) {
            var cookies = document.cookie.split(';')
            
            cookies = cookies.map(elem => elem.split('='))
            cookies.forEach(function (elem) {
                var list = elem[1].split('/')
                list = list.filter(elem => elem.length > 0)
                list = list.map(elem => elem.trim().split('|'))
                cookie.obj[elem[0].trim()] = list
            })
            
            if(cookie.obj['sizeSemestre']){
                cookie.obj['sizeSemestre'] = parseInt(cookie.obj['sizeSemestre'][0])
                
                for (let i = 0; i < this.obj['sizeSemestre']; i++) {
                    calculadoraIRA.newSemestre()
                    var dados = cookie.obj['s' + i]
        
                    if (dados) dados.forEach(elem => {
                        calculadoraIRA.addMateria(elem[0], elem[1], elem[2], i)
                    })
                }
        
                semestres.update()
            }

            if(cookie.obj['previsao'] == 'true'){
                state.previsao = true
                var dados = cookie.obj['p']
                dados.split('|')
                dados.forEach((elem, it) => {
                    previsao.createField()
                    
                    var obj = previsaoCreditos.children[it]
                    obj.value = elem
                })
            } else {
                previsaoCheck.checked = false
            }

            if(cookie.obj['visitas']){
                var visitas = parseInt(cookie.obj['visitas'])
                visitas++
                this.createCookie.visitante(visitas)
                
                if(visitas > 2) state.visitante = false
            } else this.createCookie.visitante()
        }
    },

    createCookie: {
        semestre: function(semestre){
            document.cookie = `s${state.semestre}=${semestre}`
            document.cookie = `sizeSemestre=${calculadoraIRA.semestres.length}`
        },

        previsao: function(dados, ira){
            document.cookie = `p=${dados}`
            document.cookie = `pIra=${ira}`
            document.cookie = `previsao=true`
        },
        
        visitante: function(num){
            if(!num) num = 1
            document.cookie = `visitas=${num}`
        },
        
        notPrevisao: function() {
            document.cookie = `previsao=false`
        }
    }
}