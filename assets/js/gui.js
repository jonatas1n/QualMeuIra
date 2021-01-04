gui = {
    materia: function (el) {
        var li = document.createElement('li')
        var div = document.createElement('div')
        var dados = document.createElement('div')
        var options = document.createElement('div')
        var editBtn = document.createElement('button')
        var excludeBtn = document.createElement('button')

        li.classList.add('bg-light')
        li.classList.add('shadow')
        li.classList.add('px-3')
        li.classList.add('pt-3')
        li.classList.add('pb-2')
        li.classList.add('my-1')

        div.classList.add('row')

        dados.classList.add('d-flex')
        dados.classList.add('col-8')
        dados.classList.add('row')

        options.classList.add('col-4')
        options.classList.add('options')

        editBtn.classList.add('btn')
        editBtn.classList.add('btn-secondary')
        editBtn.classList.add('d-sm-none')
        editBtn.classList.add('d-none')
        editBtn.classList.add('d-md-block')
        editBtn.classList.add('d-lg-block')
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'
        editBtn.onclick = function () {
            nomeEl.innerHTML = el.nome
            nomeEl.value = el.nome

            var mencao = Array.prototype.slice.call(mencaoEl, 0);
            mencao = mencao.filter(elem => elem.value == el.mencao)[0]
            mencao.checked = true

            var creditos = Array.prototype.slice.call(creditosEl, 0);
            creditos = creditos.filter(elem => elem.value == el.creditos)[0]
            creditos.checked = true

            calculadoraIRA.delMateria(el.id)
            semestres.update()
            calculadoraIRA.calculaIRA()
            setIRA()
        }

        excludeBtn.classList.add('btn')
        excludeBtn.classList.add('btn-secondary')
        excludeBtn.innerHTML = '<i class="fas fa-trash"></i>'
        excludeBtn.onclick = function () {
            calculadoraIRA.delMateria(el.id)
            semestres.update()
            calculadoraIRA.calculaIRA()
            setIRA()
        }


        var h4 = document.createElement('h3')
        h4.classList.add('col-12')
        h4.style.textTransform = 'capitalize'
        h4.innerHTML = el.nome

        var p1 = document.createElement('h5')
        p1.classList.add('col-6')
        p1.innerHTML = `<h5 class="d-block d-lg-flex d-md-flex d-sm-block gap-1"><i class="fas fa-coins"></i> <span class="d-sm-none d-none d-lg-block d-md-block">Créditos: </span><b>${el.creditos}</b></h5>`

        var p2 = document.createElement('h5')
        p2.classList.add('col-6')
        if (el.mencao >= 3) {
            p2.classList.add('text-success')
        } else if (el.mencao == 0) {
            p2.classList.add('text-secondary')
        } else {
            p2.classList.add('text-danger')
        }
        p2.innerHTML = `<h5 class="d-block d-lg-flex d-md-flex d-sm-block gap-1"><i class="fas fa-trophy"></i> <span class="d-sm-none d-none d-lg-block d-md-block">Menção:</span> <b>${calculadoraIRA.mencoes[el.mencao]}</b></h5>`

        dados.appendChild(h4)
        dados.appendChild(p1)
        dados.appendChild(p2)
        options.appendChild(editBtn)
        div.appendChild(dados)
        options.appendChild(excludeBtn)
        div.appendChild(options)
        li.appendChild(div)

        // Animação
        setTimeout(function () {
            li.style.opacity = 1
        }, 250)

        semestresArea.appendChild(li)
    },

    semestres: function (quant) {
        for (let i = 0; i < quant; i++) {
            var semestre = historicoSemestreTpl.content.cloneNode(true)
            
            historicoFields.appendChild(semestre)

            var len = historicoFields.children.length
            
            var label = historicoFields.children[len - 1]
            label = label.querySelector('label')
            label.innerHTML = `Sem. ${len}: `
        }
    },

    showHeader: function() {
        logo.style.top = '10px'
        logo.style.transform = 'rotate(-8deg)'
        counter.style.opacity = '1'
    }
}