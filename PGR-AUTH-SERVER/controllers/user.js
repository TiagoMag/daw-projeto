// User controller
var User = require('../models/user')

/* Procura um utilizador na bd pelo email */
module.exports.lookup = id => {
    return User
        .findOne({email: id})
        .exec()
}

/* Insere um utilizador na bd */
module.exports.insert = u => {
    var novo = new User(u)
    return novo.save()
}

/* Recebe id de um utilizador e atualiza data de último acesso */
module.exports.updateLastLogin = id => {
    data = new Date(Date.now()).toISOString()
    return User
        .updateOne({email: id},  {$set: {dataUltimoAcesso: data }} )
        .exec()
}

