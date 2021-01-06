const { response } = require('express');
var express = require('express');
const User = require('../controllers/user');
var router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = router;
