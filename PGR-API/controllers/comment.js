// Pub controller
var Comment = require('../models/comment')

/* Retorna a lista de comentários */
module.exports.list = (count,page) => {
    return Comment.find().skip(Number((page-1) * count)).sort({"dataCriacao" : -1}).limit(Number(count)).exec()
};

/* Insere um comentário na bd */
module.exports.insert = (p) => {
    var novo = new Comment(p)
    return novo.save();
  };

