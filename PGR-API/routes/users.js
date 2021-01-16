const { response } = require('express');
var express = require('express');
const User = require('../controllers/user');
var router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/lista', function(req, res, next) {
  console.log("gasga")  
  User.list()
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({message: err}) )
  });

module.exports = router;
