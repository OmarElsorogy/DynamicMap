var express = require('express');
var router = express.Router();

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
mongoose.connect("mongodb+srv://mongomap:justfakepass@cluster0.bsxkc.mongodb.net/test?retryWrites=true&w=majority");

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
    name: String,
    type: Schema.Types.Mixed
});
 
// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema, 'layercollection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET json data. */
router.get('/mapjson/:name', function (req, res) {
    if (req.params.name) {
        Json.findOne({ name: req.params.name },{}, function (err, docs) {
            res.json(docs);
        });
    }
});

/* GET layers json data. */
router.get('/maplayers', function (req, res) {
    Json.find({},{'name': 1}, function (err, docs) {
        res.json(docs);
    });
});

/* GET Map page. */
router.get('/map', function(req,res) {
    Json.find({},{}, function(e,docs){
        res.render('map', {
            "jmap" : docs,
            lat : 40.1134061,
            lng : 26.4209371
        });
    });
});

module.exports = router;