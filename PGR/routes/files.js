var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var fs = require('fs')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path')
var jwt_decode = require('jwt-decode');
var AdmZip = require('adm-zip');
var path = require('path')


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
    var token = req.cookies.token
    u_email = jwt_decode(token).id
    res.download(path.resolve(__dirname, '../') + "/public/fileStore/" + u_email + '/' + req.params.fname)
})

router.post('/',upload.array('myFile'),function(req,res){

    req.files.forEach((f,idx) => {
        console.log("f = " + JSON.stringify(f))
        var token = req.cookies.token
        u_email = jwt_decode(token).id
        let oldPath = path.resolve(__dirname, '../') + '/' + f.path
        let newPath = path.resolve(__dirname, '../') + '/public/fileStore/' + u_email + '/'

        if (!fs.existsSync(newPath)){
            fs.mkdirSync(newPath);
        }

        let filePath = newPath + f.originalname
        console.log("oldPath = " + oldPath)
        console.log("filePath = " + filePath)

        fs.rename(oldPath,filePath, function (err){
            if(err) throw err
        })

        // Escreve no ficheiro as alterações
        var files = jsonfile.readFileSync(path.resolve(__dirname, '../dbFiles.json'))
        var d = new Date().toISOString().substring(0,16)
        var n = req.files.length
        
        if(n > 1){
            files.push({
                date: d,
                name: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                desc: req.body.desc[idx],
                tipo: req.body.tipo[idx] 
            })
        }
        else if (n == 1){
            files.push({
                date: d,
                name: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                desc: req.body.desc,
                tipo: req.body.tipo
            })
        }
        jsonfile.writeFileSync(path.resolve(__dirname, '../dbFiles.json'),files)

        // Faz unzip
        var zip = new AdmZip(filePath);
        var zipEntries = zip.getEntries();
        var meta_dados = [];
        zipEntries.forEach(function(zipEntry) {
            meta_dados.push(zipEntry.toString());
        });

        // Remove o file extension
        var folder_dest = newPath + f.originalname.split('.').slice(0, -1).join('.') + "/"

        // Extrai zip para uma pasta com o mesmo nome
        zip.extractAllTo(folder_dest, true);
        console.log("Zip extracted to: " + folder_dest)

        // Apaga o zip
        fs.unlink(filePath, function(err) {
            if (err) throw err
            else console.log("Successfully deleted the zip: " + filePath)
        })
    })
    res.redirect('/files')
})
  
module.exports = router;