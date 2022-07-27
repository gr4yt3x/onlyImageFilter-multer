const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');


var storage = multer.diskStorage({
    //destino do arquivo   
    destination: function(req, file, cb) { 
       cb(null, __dirname + '/uploads/');    
    }, //nome do arquivo; newDate = esta sendo utilizado para colocar a data/hora atual no nome do arquivo.
    filename: function (req, file, cb) { 
       cb(null , Date.now() + file.originalname);   
    }
 });

const upload = multer({
    storage: storage,
    //verifica se a extensão é uma das esperadas(png; jpg; jpeg).
    fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
}
});



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/main.html');
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send("file added successfully");
});

app.listen(3000);
