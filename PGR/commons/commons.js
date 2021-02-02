// --------------------------------------------Funções auxiliares -------------------------------------------
var jwt_decode = require('jwt-decode');

/* Verifica se nível de utilizador é admin */
module.exports.verifyAdmin = (token) => {
    u_level = jwt_decode(token).nivel
    return u_level == 'admin' ? true : false
}
  
  /* Verifica se nível de utilizador é produtor */
module.exports.verifyProdutor = (token) => {
    u_level = jwt_decode(token).nivel
    return u_level == 'produtor' ? true : false
}
  
  /* Verifica se nível de utilizador é consumidor */
module.exports.verifyConsumidor = (token) => {
    u_level = jwt_decode(token).nivel
    return u_level == 'consumidor' ? true : false
}
  