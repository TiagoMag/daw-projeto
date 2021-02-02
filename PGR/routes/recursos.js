var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');
var jsonfile = require('jsonfile')
var path = require('path')
var axios = require('axios')

/* Search page */
router.get("/", function(req,res){
  var consumidor = verifyConsumidor(req.cookies.token)
  var produtor = verifyProdutor(req.cookies.token)
  res.render('recursos', { token: req.cookies.token,isProd: produtor, isCons: consumidor})  
})

router.get("/:id", function(req,res){
  var consumidor = verifyConsumidor(req.cookies.token)
  var produtor = verifyProdutor(req.cookies.token)
  var token = req.cookies.token
  u_email = jwt_decode(token).id
  var files = jsonfile.readFileSync(path.resolve(__dirname, '../dbFiles.json'))
  var f
  var name_without_ext
  files.forEach(obj => {
    if(obj["id"] === req.params.id){
      f = obj
      name_without_ext = f.name.split('.').slice(0, -1).join('.')
    }
  });

  axios.get('http://localhost:7777/recurso/' + f.id + '?token=' + req.cookies.token)
    .then(data => {res.render('recurso', {data: data.data, token: req.cookies.token,isProd: produtor, isCons: consumidor,f: f, name_without_ext: name_without_ext, u_email: u_email})})
    .catch(err => res.render('error', {error: err}));

})
    
// --------------------------------------------Funções auxiliares -------------------------------------------

/* Verifica se nível de utilizador é produtor */
function verifyProdutor(token){
  u_level = jwt_decode(token).nivel
  return u_level == 'produtor' ? true : false
}

/* Verifica se nível de utilizador é consumidor */
function verifyConsumidor(token){
  u_level = jwt_decode(token).nivel
  return u_level == 'consumidor' ? true : false
}

module.exports = router;
  