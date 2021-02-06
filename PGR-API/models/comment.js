const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    prodId: String,
    text: String,
    recursoId: String,
    dataCriacao: String
});
 
module.exports = mongoose.model('comment', commentSchema) 
