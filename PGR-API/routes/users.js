const { response } = require('express');
var express = require('express');
const User = require('../controllers/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = req.body;
   data.forEach(function (item) {
       res.send(item.id);
       res.send(item.Name);
   });
});

router.post('/', (req,res)=>{
  User.insert(req.body)
  res.redirect('/users')
})

module.exports = router;
