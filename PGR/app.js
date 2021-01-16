var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// B ------------------------------------------------------------------------------------------------

var bodyParser = require('body-parser')
var templates = require('./html-template')
var jsonfile = require('jsonfile')
var fs = require('fs')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// E ------------------------------------------------------------------------------------------------

var app = express();

// B ------------------------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// E ------------------------------------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// B ------------------------------------------------------------------------------------------------

app.get('/files',function(req,res){
  var d = new Date().toISOString().substring(0,16)
  var files = jsonfile.readFileSync('./dbFiles.json')
  res.writeHead(200,{'Content-type': 'text/html; charset=utf-8'})
  res.write(templates.fileList(files,d))
  res.end()
})

app.get('/files/upload',function(req,res){
  var d = new Date().toISOString().substring(0,16)
  res.writeHead(200,{'Content-type': 'text/html; charset=utf-8'})
  res.write(templates.fileForm(d))
  res.end()
})

app.get('/files/download/:fname',function(req,res){
  res.download(__dirname + "/public/fileStore/" + req.params.fname)
})

app.post('/files',upload.array('myFile'),function(req,res){

  req.files.forEach((f,idx) => {
      let oldPath = __dirname + '/' + f.path
      console.log("oldPath = " + oldPath)
      let newPath = __dirname + '/public/fileStore/' + f.originalname
      console.log("newPath = " + newPath)

      fs.rename(oldPath,newPath, function (err){
          if(err) throw err
      })

      var files = jsonfile.readFileSync('./dbFiles.json')
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
      jsonfile.writeFileSync('./dbFiles.json',files)
  })
  res.redirect('/files')
})

// E ------------------------------------------------------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
