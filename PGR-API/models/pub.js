const mongoose = require('mongoose')

var pubSchema = new mongoose.Schema({
    prodId: String,
    recursoId: String,
    coments:[
                {
                    data : String,
                    autor: String,
                    text: String
                }
            ],
    data: String
});
 
module.exports = mongoose.model('pub', pubSchema)