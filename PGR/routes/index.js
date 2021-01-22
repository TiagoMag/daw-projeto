var express = require('express');
var router = express.Router();
var axios = require('axios')
var User = require('../models/user')
var jwt_decode = require('jwt-decode');


/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies.auth == "2") { res.cookie('auth', {expires: Date.now()}); res.render('index', {err: "2", title: 'PGR' });} 
  if (req.cookies.auth == "1") { res.cookie('auth', {expires: Date.now()}); res.render('index', {err: "1", title: 'PGR' });} 
  else res.render('index', {err: "0", title: 'PGR' });
});

router.get('/naoaut', function(req, res) {
  res.render('naoaut', { title: 'PGR' });
});

router.get('/registar', function(req, res) {
  res.render('registar', { title: 'PGR' });
});

router.get('/perfilp', function(req, res) {
  console.log(req.cookies)
  if(req.cookies.logout == "1") {res.cookie('auth', "2", {
    expires: new Date(Date.now() + '1d'),
    secure: false, // set to true if your using https
    httpOnly: true
  }); res.redirect("/")}
  u_id = jwt_decode(req.cookies.token).id
  axios.get('http://localhost:7777/users/perfilmail/' + u_id+ "?token=" + req.cookies.token)  //get email(id)
    .then (dados => {
      if(verifyAdmin(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
      if(verifyProdutor(req.cookies.token) == true) res.render("perfilp", { title: 'PGR', perfil: dados.data.data })
      if(verifyConsumidor(req.cookies.token) == true) res.render("naoaut", {title: 'PGR' })
    })
    .catch(err => res.render('error',{error: err}))
});

router.get('/perfilc', function(req, res) {
  if(req.cookies.logout == "1") {res.cookie('auth', "2", {
    expires: new Date(Date.now() + '1d'),
    secure: false, // set to true if your using https
    httpOnly: true
  }); res.redirect("/")}
  u_id = jwt_decode(req.cookies.token).id
  axios.get('http://localhost:7777/users/perfilmail/' + u_id+ "?token=" + req.cookies.token)  //get email(id)
    .then (dados => {
      if(verifyAdmin(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
      if(verifyProdutor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
      if(verifyConsumidor(req.cookies.token) == true) res.render("perfilc", {title: 'PGR', perfil: dados.data.data})
    })
    .catch(err => res.render('error',{error: err}))
});

router.post('/registar', function(req, res) {
  var u = new User(req.body)
  u.dataRegisto = new Date(Date.now()).toISOString()
  u.dataUltimoAcesso = new Date(Date.now()).toISOString()
  axios.post('http://localhost:7776/users/registar',
    u
  )
  .then(data => console.log("Registado"))
  .catch(err => res.render('error',{error: err}))
  res.redirect("/")
});

router.post('/login', function(req, res) {
  var email = req.body.email
  var password = req.body.password
  var u = {"email" : email, "password" : password}
  axios.post('http://localhost:7776/users/login', u)
    .then(dados => {
      res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true
      });
      if(verifyAdmin(dados.data.token) == true) res.redirect("/admin/edit")
      if(verifyProdutor(dados.data.token) == true) res.redirect("/perfilp")
      if(verifyConsumidor(dados.data.token) == true) res.redirect("/perfilc")
    })
    .catch( err => {res.cookie('auth', "1", {
      expires: new Date(Date.now() + '1d'),
      secure: false, // set to true if your using https
      httpOnly: true
    }); res.redirect("/")})
});

router.get('/admin/edit',function(req,res){
  if(verifyProdutor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyConsumidor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyAdmin(req.cookies.token) == true){
  axios.get('http://localhost:7777/users/lista?token=' + req.cookies.token)
    .then(data => {res.render('edit', {token: req.cookies.token,list: data.data, title: 'PGR'})})
    .catch(err => res.render('error', {error: err}))}
  })

router.get('/admin/:id',function(req,res){
  id = req.params.id
  if(verifyProdutor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyConsumidor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyAdmin(req.cookies.token) == true){
  axios.get('http://localhost:7777/users/perfil/' + id + '?token=' + req.cookies.token)
    .then(data => {res.render('paguser', {id:id ,token: req.cookies.token,list: data.data, title: 'PGR'})})
    .catch(err => res.render('error', {error: err}))}
  })


  router.get("/logout", function(req,res){
    res.cookie('logout', "1", {
      expires: new Date(Date.now() + '1d'),
      secure: false, // set to true if your using https
      httpOnly: true
    })
    res.cookie('token', {expires: Date.now()});
    res.redirect("/")
  })
  

function verifyAdmin(token){
  u_level = jwt_decode(token).nivel
  return u_level == 'admin' ? true : false
}

function verifyProdutor(token){
  u_level = jwt_decode(token).nivel
  return u_level == 'produtor' ? true : false
}

function verifyConsumidor(token){
  u_level = jwt_decode(token).nivel
  return u_level == 'consumidor' ? true : false
}

  
module.exports = router;
