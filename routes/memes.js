var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var comments = [];

router.get('/', function(req, res, next) {
    var file = path.join(__dirname, '../models/memes.json');
    fs.readFile(file, function(err, data){
        if(err){
            throw err;
        }
        var memes = JSON.parse(data);
        var sentfile = path.join(__dirname, '../models/sentences.json');
        fs.readFile(sentfile, function(err, sentenceData){
            console.log(memes);
            console.log(sentenceData);
            var sentenceArray = JSON.parse(sentenceData);
            console.log(sentenceArray);
            res.render('layout', {memes: memes, sentences: sentenceArray});
        })
    });
});

router.post('/', function(req, res, next){
    var file = path.join(__dirname, '../models/messages.json');
    fs.readFile(file, function(err, data){
        if (err) throw err;
        data = JSON.parse(data);
        data.push(req.body);
        data = JSON.stringify(data);
        fs.writeFile(file, data, function () {
            fs.readFile(file, function (err, newdata) {
                if (err) throw err;
                res.send(JSON.parse(newdata));
            })
        })
    })
});

router.get('/handlebars', function(req, res, next){
    var file = path.join(__dirname, '../public/views/handlebars.html');
    res.sendFile(file);
});

router.get('/messages', function(req, res, next){
    var file = path.join(__dirname, '../models/messages.json');
    fs.readFile(file, function(err, data){
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

module.exports = router;


