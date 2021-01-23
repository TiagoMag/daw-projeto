// Recurso controller
var Recurso = require('../models/recurso')

/* Retorna a lista de recursos */
module.exports.list = () => {
    return Recurso
        .find()
        .sort({dataRegisto:1})
        .exec()
}

/* Retorna a lista de recursos de um utilizador */
module.exports.listByUser = (email) => {
    return Recurso
        .find({autor:email})
        .sort({dataRegisto:1})
        .exec()
}

/* Retorna a lista de recursos de um tipo */
module.exports.listByTipo = (tipo) => {
    return Recurso
        .find({tipo:tipo})
        .sort({dataRegisto:1})
        .exec()
}

/* Retorna a lista de recursos de um ano */
module.exports.listByAno = (ano) => {
    return Recurso
        .find({
            dataCriacao: { $regex: `^${ano}` },
        })
        .sort({dataRegisto:1})
        .exec()
}

/* Retorna a lista de recursos com tags em comum */
module.exports.listByTags = (tags) => {
    return Recurso
        .find({
            hashtags : { $in: tags },
        })
        .sort({dataRegisto:1})
        .exec()
}

/* Insere um recurso na bd */
module.exports.insert = r => {
    var novo = new Recurso(r)
    return novo.save()
}