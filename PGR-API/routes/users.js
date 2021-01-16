const { response } = require('express');
var express = require('express');
const User = require('../controllers/user');
var router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/lista', function(req, res, next) {
  User.list()
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({message: err}) )
  });

router.get('/perfil/:id', function(req, res, next) { 
  id = req.params.id
  User.lookupid(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({message: err}) )
  });

module.exports = router;
