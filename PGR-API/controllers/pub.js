// Pub controller
var Pub = require('../models/pub')

/* Retorna a lista de recursos */
module.exports.list = (count,page) => {
    return Pub.find().skip(Number((page-1) * count)).sort({"data" : -1}).limit(Number(count)).exec()
};


