'use strict';

var express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer')
var cors = require('cors');

// require and use "multer"...
var app = express();

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
const upload = multer({dust: 'uploads'})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
