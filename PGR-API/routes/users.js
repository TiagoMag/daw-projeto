const { response } = require('express');
var express = require('express');
const User = require('../controllers/user');
var router = express.Router();
const jwt = require('jsonwebtoken');

/*router.post('/registar', (req,res)=>{
    print("asdasd")
    console.log("asdasd")
    user = req.body
    User.insert(user)
    .then(data => res.status(200).json({message: 'User registado com sucesso:'+data}))
    console.log(user)
    User.inserir(user)
    .then(data => res.status(200).json({message: 'User registado com sucesso:'}))
    .catch(err => res.status(500).json({message: err}) )
  })*/

module.exports = router;
