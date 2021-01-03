mail = {
    send: function(){
        var from = document.getElementById('mail-from').value
        var message = document.getElementById('mail-message').value

        Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'jonatasgomesb@gmail.com',
            Password : "B3A327B4162F8270E67CC57423FDDB5E1B91",
            To : 'jonatasgomesb@gmail.com',
            From : from,
            Subject : "Qual Meu Ira - Mensagem do usuário",
            Body : message
        }).then(() => {
            from.value = ''
            message.value = ''
        })
    }
}