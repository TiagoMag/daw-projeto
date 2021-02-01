var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path')
var fs = require('fs')

/* Search page */
router.get("/", function(req,res){
    var consumidor = verifyConsumidor(req.cookies.token)
    var produtor = verifyProdutor(req.cookies.token)
    res.render('recursos', { token: req.cookies.token,isProd: produtor, isCons: consumidor})  
  })
    
// --------------------------------------------Funções auxiliares -------------------------------------------

/* Verifica se nível de utilizador é admin */
function verifyAdmin(token){
    u_level = jwt_decode(token).nivel
    return u_level == 'admin' ? true : false
  }
  
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
  