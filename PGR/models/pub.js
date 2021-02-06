const mongoose = require('mongoose')

var pubSchema = new mongoose.Schema({
    prodId: String,
    prodName: String,
    recursoTitulo: String,
    recursoDescricao: String,
    recursoTipo: String,
    recursoId: String,
<<<<<<< HEAD
    dataCriacao: String
=======
    data: String
>>>>>>> 2986e0fb3f46b296e98209f6a04de3d0961a763f
});
 
module.exports = mongoose.model('pub', pubSchema) 
