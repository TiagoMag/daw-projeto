var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var fs = require('fs')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path')
var jwt_decode = require('jwt-decode');
var AdmZip = require('adm-zip');
var axios = require('axios')
const Recurso = require('../models/recurso');

/* GET files */
router.get('/',function(req,res){
    var token = req.cookies.token
    u_email = jwt_decode(token).id
    var d = new Date().toISOString().substring(0,16)
    var files = jsonfile.readFileSync(path.resolve(__dirname, '../dbFiles.json'))
    res.render("files",{title:"File List",files: files, d: d, u_email: u_email})
})

/* GET upload */
router.get('/upload',function(req,res){
    var d = new Date().toISOString().substring(0,16)
    res.render("fileForm",{title:"File Upload",d: d})
})
  
/* Download file */
router.get('/download/:fname', function(req,res){
    var token = req.cookies.token
    u_email = jwt_decode(token).id

    // ---------------------- Zippa de novo ------------------------

    var zip = new AdmZip();
    var name_without_ext = req.params.fname.split('.').slice(0, -1).join('.')
    var folder = path.resolve(__dirname, '../') + "/public/fileStore/" + u_email + '/' + name_without_ext
    fs.readdirSync(folder).forEach(file => {
        zip.addLocalFile(folder + "/" + path.parse(file).base);
    });

    let newZip = path.resolve(__dirname, '../') + '/public/fileStore/' + u_email + '/' + req.params.fname

    zip.writeZip(newZip);

    // -------------------------------------------------------------

    res.download(newZip, function(err) {
        if (err) console.log(err);
        fs.unlink(newZip, function(){
            console.log("File was deleted")
        });
    });
})

/* POST file */
router.post('/',upload.array('myFile'),function(req,res){

    req.files.forEach((f,idx) => {
        console.log("f = " + JSON.stringify(f))
        console.log("req = " + JSON.stringify(req.body))
        var token = req.cookies.token
        u_email = jwt_decode(token).id
        let oldPath = path.resolve(__dirname, '../') + '/' + f.path
        let newPath = path.resolve(__dirname, '../') + '/public/fileStore/' + u_email + '/'

        if (!fs.existsSync(newPath)){
            fs.mkdirSync(newPath);
        }

        var zip2 = new AdmZip(oldPath);
        var zipEntries2 = zip2.getEntries();
        var meta_dados2 = [];
        zipEntries2.forEach(function(zipEntry2) {
            meta_dados2.push(zipEntry2);
        });
        if(req.body.tipo != "aplicacao"){
            var ext = path.extname(meta_dados2[0]["name"]).substring(1)
        }
        else
            var ext = "zip"

        let filePath = newPath + f.originalname

        fs.rename(oldPath,filePath, function (err){
            if(err) throw err
        })
        var r = new Recurso()
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
                tipo: req.body.tipo[idx],
                ext: ext
            })
            r.tipo = req.body.tipo[idx], // Relatorio,tese,exame,artigo,aplicacao,slides
            r.titulo = req.body.titulo[idx]
            r.descricao = req.body.desc[idx]
            r.subtitulo = req.body.subtitulo[idx] // Opcional 
            r.dataCriacao = req.body.dataCriacao[idx] 
            r.visibilidade = req.body.visibilidade[idx]
            r.hashtags = req.body.hashtags[idx]
            
        }
        else if (n == 1){
            files.push({
                date: d,
                name: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                desc: req.body.desc,
                tipo: req.body.tipo,
                ext: ext
            })
            r.tipo = req.body.tipo, // Relatorio,tese,exame,artigo,aplicacao,slides
            r.titulo = req.body.titulo
            r.descricao = req.body.desc
            r.subtitulo = req.body.subtitulo // Opcional 
            r.dataCriacao = req.body.dataCriacao 
            r.visibilidade = req.body.visibilidade
            r.hashtags = req.body.hashtags
            
        }

        jsonfile.writeFileSync(path.resolve(__dirname, '../dbFiles.json'),files)

        r.rating = 0
        r.autor = u_email

        axios.post('http://localhost:7777/recurso?token='+token,r)
        .then(data => console.log("Registado"))
        .catch(err => console.log("Erro:"+err))

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