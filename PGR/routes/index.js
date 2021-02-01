var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path')
var fs = require('fs')
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies.auth == "1") { res.cookie('auth', {expires: Date.now()}); res.render('index', {err: "1", title: 'PGR' });} 
  else if (req.cookies.auth == "2") { res.cookie('auth', {expires: Date.now()}); res.render('index', {err: "2", title: 'PGR' });} 
  else res.render('index', {err: "0", title: 'PGR' });
});

/* Página de acesso não autorizado */
router.get('/naoaut', function(req, res) {
  res.render('naoaut', { title: 'PGR' });
});


/* Form de registo */
router.get('/registar', function(req, res) {
  res.render('registar', { title: 'PGR' });
});

/* Perfil de consumidor e produtor */
router.get('/perfil', function(req, res) {
  if(req.cookies.logout == "1") { // verifica se sessão deu logout
    res.cookie('auth', "2", { 
      expires: new Date(Date.now() + '1d'),
      secure: false, // set to true if your using https
      httpOnly: true
     }); 
     res.redirect("/")
  }
  u_id = jwt_decode(req.cookies.token).id // retira email da cookie
  axios.get('http://localhost:7777/users/perfil?email=' + u_id+ "&token=" + req.cookies.token)  
    .then (dados => {
      const testFolder = path.resolve(__dirname, '../') + "/public/profilepics/"

      // -------------------------- Adiciona extensão --------------------------

      var extensao = ""
      fs.readdirSync(testFolder).forEach(file => {
        if(path.parse(file).name == dados.data.data.email){
          extensao = path.parse(file).ext
        }
      });

      // Se não encontrar o ficheiro, quer dizer que o user não tem foto de perfil
      var temFoto = true
      if(extensao == ""){
        temFoto = false
      }

      // -----------------------------------------------------------------------

      if(verifyAdmin(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
      var consumidor = verifyConsumidor(req.cookies.token)
      var produtor = verifyProdutor(req.cookies.token)
      res.render("perfil", {title: 'PGR', perfil: dados.data.data, extensao: extensao , isProd: produtor, isCons: consumidor, temFoto: temFoto, id: u_id, token: req.cookies.token})
    })
    .catch(err => res.render('error',{error: err}))
});

/* POST utilizador */
router.post('/registar',upload.single('myFile'), function(req, res) {
  var u = new User(req.body)
  u.dataRegisto = new Date(Date.now()).toISOString()
  u.dataUltimoAcesso = new Date(Date.now()).toISOString()

  if(req.file){

    //------------------------- Upload Profile Pic ----------------------------------

    let oldPath = path.resolve(__dirname, '../') + '/' + req.file.path
    let newPath = path.resolve(__dirname, '../') + '/public/profilepics/' + u.email + path.extname(req.file.originalname)

    fs.rename(oldPath,newPath, function (err){
      if(err) throw err
    })

    // ------------------------------------------------------------------------------
  }

  // regista utilizador
  axios.post('http://localhost:7776/users/registar',u)
  .then(data => console.log("Registado"))
  .catch(err => res.render('error',{error: err}))
  res.redirect("/")
});

/* POST login */
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
      res.cookie('logout', {expires: Date.now()});
      if(verifyAdmin(dados.data.token) == true) res.redirect("/admin/edit")
      if(verifyProdutor(dados.data.token) || verifyConsumidor(dados.data.token)) 
        res.redirect("/perfil")
    })
    .catch( err => {res.cookie('logout', "0", {
      expires: new Date(Date.now() + '1d'),
      secure: false, // set to true if your using https
      httpOnly: true
    }); res.redirect("/")})
});

/* Página de admin ... */
router.get('/admin/edit',function(req,res){
  if(verifyProdutor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyConsumidor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyAdmin(req.cookies.token) == true){
  axios.get('http://localhost:7777/users/lista?token=' + req.cookies.token)
    .then(data => {res.render('edit', {token: req.cookies.token,list: data.data, title: 'PGR'})})
    .catch(err => res.render('error', {error: err}))}
  })

/* Página de admin ... */
router.get('/admin/:id',function(req,res){
  id = req.params.id
  if(verifyProdutor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyConsumidor(req.cookies.token) == true) res.render("naoaut", { title: 'PGR' })
  if(verifyAdmin(req.cookies.token) == true){
  axios.get('http://localhost:7777/users/perfil/' + id + '?token=' + req.cookies.token)
    .then(data => {res.render('paguser', {id:id ,token: req.cookies.token,list: data.data, title: 'PGR'})})
    .catch(err => res.render('error', {error: err}))}
  })

/* Logout */
router.get("/logout", function(req,res){
  res.cookie('logout', "1", {
    expires: new Date(Date.now() + '1d'),
    secure: false, // set to true if your using https
    httpOnly: true
  })
  res.cookie('token', {expires: Date.now()});
  res.redirect("/")
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
