// App
var express = require('express');
var app = express();
var port = process.env.port || 1944;

app.use(express.logger('dev'));
app.use(express.compress());

// Static files
app.use(express.static(__dirname));

// Run server
app.listen(port, function () {
  console.log('Now listening on %d', port);
});
