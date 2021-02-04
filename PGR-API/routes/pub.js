var express = require('express');
var router = express.Router();
const Pub = require('../controllers/pub');

/* GET lista publicações */
router.get('/lista', function(req, res, next) {
    var limit = req.query.limit
    var page = req.query.page
    Pub.list(limit,page)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({message: err}))
});

module.exports = router;
