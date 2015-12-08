var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');

var app = express(); 
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true }));
//var http = require("http");

app.use(express.static(__dirname + '/public'));

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/hearthduel';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.post('/sendCollection', function(request, response) {
	var classic = request.body.Classic;
	var naxx = request.body.Naxxramas;
	var gvg = request.body["Goblins vs Gnomes"];
	var brm = request.body["Blackrock Mountain"];
	var tgt = request.body["The Grand Tournament"];
	var tloe = request.body["The League of Explorers"];
	var name =  request.body.collectionName;
	var toInsert = {
		"name": collectionName,
		"classic": classic,
		"naxx": naxx,
		"gvg": gvg,
		"brm": brm,
		"tgt": tgt,
		"tloe": tloe,
	};
	db.collection('collection', function(error, coll) {
		var id = coll.insert(toInsert, function(error, saved) {
			if (error) {
				response.send(500);
			}
			else {
				response.send(200);
			}
	    });
	});
});

app.listen(process.env.PORT || 3000);