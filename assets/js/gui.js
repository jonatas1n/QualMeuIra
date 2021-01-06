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
        dados.classList.add('col-10')
        dados.classList.add('row')

        options.classList.add('col-2')
        options.classList.add('gap-0')
        options.classList.add('gap-lg-1')
        options.classList.add('gap-md-0')
        options.classList.add('gap-sm-0')
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
        p1.classList.add('d-block')
        p1.classList.add('d-lg-flex')
        p1.classList.add('d-md-flex')
        p1.classList.add('d-sm-block')
        p1.classList.add('gap-1')

        var span1 = document.createElement('span')
        span1.classList.add('d-sm-none')
        span1.classList.add('d-none')
        span1.classList.add('d-lg-block')
        span1.classList.add('d-md-block')
        span1.innerHTML = 'Créditos: '

        p1.innerHTML = `<i class="fas fa-coins"></i>`
        p1.appendChild(span1)
        p1.innerHTML += `<b>${el.creditos}</b>`

        var p2 = document.createElement('h5')
        p2.classList.add('col-6')
        p2.classList.add('d-block')
        p2.classList.add('d-lg-flex')
        p2.classList.add('d-md-flex')
        p2.classList.add('d-sm-block')
        p2.classList.add('gap-1')
        p2.classList.add('align-content-start')

        var span2 = document.createElement('h5')
        span2.classList.add('d-sm-none')
        span2.classList.add('d-none')
        span2.classList.add('d-lg-block')
        span2.classList.add('d-md-block')
        span2.innerHTML = 'Menção: '

        if (el.mencao >= 3) {
            p2.classList.add('text-success')
        } else if (el.mencao == 0) {
            p2.classList.add('text-secondary')
        } else {
            p2.classList.add('text-danger')
        }

        p2.innerHTML = `<i class="fas fa-trophy"></i>`
        p2.appendChild(span2)
        p2.innerHTML += `<b>${calculadoraIRA.mencoes[el.mencao]}</b>`

        dados.appendChild(h4)
        dados.appendChild(p1)
        dados.appendChild(p2)
        div.appendChild(dados)

        options.appendChild(editBtn)
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