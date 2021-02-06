var express = require('express');
var router = express.Router();
const Comment = require('../controllers/comment');
const Voto = require('../controllers/voto');
var moment = require('moment'); 

/* GET lista publicações */
router.get('/lista', function(req, res, next) {
    var limit = req.query.limit
    var page = req.query.page
    Comment.list(limit,page)
    .then(data => res.send(data))
    .catch(err => res.status(500).json({message: err}))
});

router.post('/', function(req, res, next) {
    var comment = req.body
    comment.dataCriacao = moment(new Date(Date.now())).format('YYYY-MM-DD hh:mm:ss')
    Comment.insert(pub)
    .then(data => res.status(200).json({message: data._id}))
    .catch(err => res.status(404).json({message: 'Publicação não inserido!'+ err})) 
});

/* Voto de um utilizador */
router.get('/voto/:userID/:recursoID', function(req, res, next) {
    Voto.lookup(req.params.userID,req.params.recursoID)
    .then(data => res.send(data))
    .catch(err => res.status(500).json({message: err}))
});


module.exports = router;
