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

function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1)
    || !Array.isArray(_arr2)
    || _arr1.length !== _arr2.length
    ) {
      return false;
    }
  
  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
       }
  }
  
  return true;
}

module.exports.manifestValidator = (meta_dados,manifest,tipo) => {
  manifest_json = JSON.parse(manifest)
  if((tipo == "relatorio" || tipo == "tese" || tipo == "artigo" || tipo == "slides" || tipo == "cartaz") && (meta_dados.length > 1 || manifest_json.length > 1)){
    console.log(meta_dados.length)
    console.log(manifest_json.length)
    return false
  }
  //console.log("meta_dados = " + meta_dados)
  console.log("manifest_json = " + manifest_json.ficheiros)
  return arrayCompare(meta_dados,manifest_json.ficheiros)
}