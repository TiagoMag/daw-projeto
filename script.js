var axios = require('axios')

axios.post('http://localhost:7778/users',{
    "nome":"João Nuno Abreu",
    "email":"j.nuno.abreu@gmail.com",
    "filiacao":"estudante",
    "nivel":"admin",
    "dataRegisto":"21/12/2020",
    "dataUltimoAcesso":"21/12/2020",
    "password":"123"
    })
    .then(dados => {
        var token = dados.data.token
        console.log('Token: ' + token + "\n\n")

        axios.get('http://localhost:7777/infoSecreta?token=' + token)
            .then(dados2 => {
                console.log('Dados: ' + JSON.stringify(dados2.data))
            })
            .catch(e => {
                console.log('Erro: não consegui obter os dados! ' + e)
            })
    })
    .catch(e => {
        console.log('Erro: não consegui obter o token! ' + e)
    })