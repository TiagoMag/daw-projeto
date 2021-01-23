const { response } = require('express');
var express = require('express');
var router = express.Router();
var moment = require('moment'); 
const jwt = require('jsonwebtoken');
const Recurso = require('../controllers/recurso');

/* GET lista de recursos por utilizador/tipo/ano/hashtag */
router.get('/lista', function(req, res, next) {
    var autor = req.query.autor
    var tipo = req.query.tipo
    var ano = req.query.ano
    var tags = req.query.tags
    if(tags)
        var array_tags = tags.split(" ")
    if(autor){
        Recurso.listByUser(autor)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(tipo){
        Recurso.listByTipo(tipo)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(ano){
        Recurso.listByAno(ano)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(tags){
        Recurso.listByTags(array_tags)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else{
        Recurso.list()
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
});

/* POST de um recurso */
router.post('/', (req, res) => {
    rec = req.body
    rec.dataRegisto = moment(new Date(Date.now())).format('YYYY-MM-DD hh:mm:ss')
    rec.dataCriacao = moment(new Date(req.body.dataCriacao)).format('YYYY-MM-DD hh:mm:ss')
    Recurso.insert(rec)
    .then(data => res.status(200).json({message: 'User registado com sucesso:'+data}))
    .catch(err => res.status(404).json({message: 'Recurso não inserido!'+ err})) 
});


module.exports = router;