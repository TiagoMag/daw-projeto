var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

// Autenticação utilizador e geração de token para a sessão
router.post('/login', (req, res, next) => {
  var email = req.body.email 
  var password = req.body.password
  User.lookup(email)
  .then(data => {
    console.log(data.email)
    if(data.email == email && data.password == password){
      const id = email; 
      const nivel = data.nivel
      const token = jwt.sign({ id, nivel }, process.env.SECRET, {
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


module.exports = router;
