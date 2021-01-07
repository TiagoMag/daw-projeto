var express = require('express');
var router = express.Router();
var axios = require('axios')


var User = require('../models/user')


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'PGR' });
});


router.get('/registar', function(req, res) {
  res.render('registar', { title: 'PGR' });
});

router.get('/perfil', function(req, res) {
  res.render('perfil', { title: 'PGR' });
});

router.post('/registar', function(req, res) {
  var u = new User(req.body)
  u.dataRegisto = new Date(Date.now()).toISOString()
  u.dataUltimoAcesso = new Date(Date.now()).toISOString()
  axios.post('http://localhost:7776/users/registar',
    u
  )
  .then(data => console.log("Registado"))
  .catch(err => console.log("Deu merda"))
  res.redirect("/")
});


router.post('/login', function(req, res) {
  var email = req.body.email
  var password = req.body.password
  var u = {"email" : email, "password" : password}
  console.log(u)
  axios.post('http://localhost:7776/users/login',
    u
  )
  .then(data => console.log("Registado"))
  .catch(err => console.log("Erro"))
  res.redirect("/perfil")
});

module.exports = router;
