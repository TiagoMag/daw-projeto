var express = require('express');
var router = express.Router();
var moment = require('moment'); 
const jwt = require('jsonwebtoken');
const Recurso = require('../controllers/recurso');

/* GET lista de recursos por utilizador/tipo/ano/hashtag */
router.get('/lista', function(req, res, next) {
    // query strings
    var autor = req.query.autor
    var tipo = req.query.tipo
    var ano = req.query.ano
    var tags = req.query.tags
    var nome = req.query.nome
    if(tags){
        var array_tags = tags.split(" ")
        Recurso.listByTags(array_tags)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(autor){
        Recurso.listByUser(autor)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(tipo){
        Recurso.listByTipo(tipo)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(nome){
        Recurso.listByNome(nome)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({message: err}))
    }
    else if(ano){
        if(ano.length==4){
            Recurso.listByAno(ano)
            .then(data => res.status(200).json({data: data}))
            .catch(err => res.status(500).json({message: err}))
        }else res.status(404).json({message: "Data tem de ter 4 digitos"})  
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
    console.log(rec)
    rec.dataRegisto = moment(new Date(Date.now())).format('YYYY-MM-DD hh:mm:ss')
    rec.dataCriacao = moment(new Date(req.body.dataCriacao)).format('YYYY-MM-DD')
    Recurso.insert(rec)
    .then(data => res.status(200).json({message: data._id}))
    .catch(err => res.status(404).json({message: 'Recurso não inserido!'+ err})) 
});

/* GET tipos  um recurso */
router.get('/tipos', (req, res) => {
    Recurso.tipos()
    .then(data => res.status(200).json({message: data}))
    .catch(err => res.status(500).json({message: err})) 
});

module.exports = router;