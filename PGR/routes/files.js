var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var fs = require('fs')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path')
var jwt_decode = require('jwt-decode');


router.get('/',function(req,res){
    var token = req.cookies.token
    u_email = jwt_decode(token).id
    var d = new Date().toISOString().substring(0,16)
    var files = jsonfile.readFileSync(path.resolve(__dirname, '../dbFiles.json'))
    res.render("files",{files: files, d: d, u_email: u_email})
})

router.get('/upload',function(req,res){
    var d = new Date().toISOString().substring(0,16)
    res.render("fileForm",{d: d})
})
  
router.get('/download/:fname',function(req,res){
    res.download(path.resolve(__dirname, '../') + "/public/fileStore/" + req.params.fname)
})

router.post('/',upload.array('myFile'),function(req,res){

    req.files.forEach((f,idx) => {
        var token = req.cookies.token
        u_email = jwt_decode(token).id
        let oldPath = path.resolve(__dirname, '../') + '/' + f.path
        let newPath = path.resolve(__dirname, '../') + '/public/fileStore/' + u_email + '/'

        if (!fs.existsSync(newPath)){
            fs.mkdirSync(newPath);
        }

        newPath += f.originalname

        fs.rename(oldPath,newPath, function (err){
            if(err) throw err
        })

        var files = jsonfile.readFileSync(path.resolve(__dirname, '../dbFiles.json'))
        var d = new Date().toISOString().substring(0,16)
        var n = req.files.length

        if(n > 1){
            files.push({
                date: d,
                name: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                desc: req.body.desc[idx]
            })
        }
        else if (n == 1){
            files.push({
                date: d,
                name: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                desc: req.body.desc
            })
        }
        jsonfile.writeFileSync(path.resolve(__dirname, '../dbFiles.json'),files)
    })
    res.redirect('/files')
})
  
module.exports = router;