var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');
var jsonfile = require('jsonfile')
var path = require('path')
var axios = require('axios')
const Commons = require('../commons/commons')
var fs = require('fs')

/* Search page */
router.get("/", function(req,res){
  var consumidor = Commons.verifyConsumidor(req.cookies.token)
  var produtor = Commons.verifyProdutor(req.cookies.token)
  res.render('recursos', { token: req.cookies.token,isProd: produtor, isCons: consumidor})  
})

router.get("/:id", function(req,res){
  var consumidor = Commons.verifyConsumidor(req.cookies.token)
  var produtor = Commons.verifyProdutor(req.cookies.token)
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

  var conjunto_imgs = []
  
  if((f.tipo == "teste" || f.tipo == "problema" || f.tipo == "cartaz") && f.ext == "zip"){
    var folder_recurso = path.resolve(__dirname, '../') + "/public/fileStore/" + u_email + '/' + name_without_ext + '/data/'
    fs.readdirSync(folder_recurso).forEach(file => {
      conjunto_imgs.push(file)
    });
  }
  axios.get('http://localhost:7777/recurso/' + f.id + '?token=' + req.cookies.token)
    .then(data => {res.render('recurso', {data: data.data, token: req.cookies.token,isProd: produtor, isCons: consumidor,f: f, name_without_ext: name_without_ext,u_email:u_email,conjunto_imgs:conjunto_imgs})})
    .catch(err => res.render('error', {error: err}));

})
    
module.exports = router;
  