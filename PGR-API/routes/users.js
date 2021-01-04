const { response } = require('express');
var express = require('express');
const User = require('../controllers/user');
var router = express.Router();
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/',verifyJWT, function(req, res, next) {
  User.list()
  .then(data => res.status(200).json({message: data}))
  .catch(err => res.status(500).json({message: err}) )
  
});

router.post('/registar', (req,res)=>{
  console.log("asdasd")
  user = req.body
  console.log(user)
  User.inserir(user)
  .then(data => res.status(200).json({message: 'User registado com sucesso:'}))
  .catch(err => res.status(500).json({message: err}) )
 
})

// Autenticação utilizador e geração de token para a sessão
router.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    var email = req.body.email 
    var password = req.body.password
    console.log(email)
    console.log(password)
    User.lookup(email)
    .then(data => {
      console.log(data.email)
      if(data.email == email && data.password == password){
        const id = email; 
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
      }else{ res.status(500).json({message: 'Login inválido!'});}

    })
    .catch(err => res.status(500).json({message: 'Login inválido!'+ err}))    
})

router.post('/logout', function(req, res) {
  res.json({ auth: false, token: null });
})

// Autorização
function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

module.exports = router;
