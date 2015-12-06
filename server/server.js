var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./routes/routes')(app, express);

var port = process.env.PORT || 8080;
var node_env = process.env.NODE_ENV || 'development';


// MongoDB connection
mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/ZenType';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db success');
});


// serve static files from specified locations and index page on "/"
app.use(express.static(__dirname + '/../client/static'));
app.use(express.static(__dirname + '/../client/src'));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


if (require.main === module) {
  app.listen(port);
  console.log('listening on ' + port);
  console.log('app listening on port: ' + port + ' in ' + node_env + ' mode.');
}

exports = module.exports = app;
