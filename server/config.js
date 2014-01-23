module.exports = function (env) {
  var express = require('express');
  var app = express();

  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser())
  app.use(express.session({
    secret: 'awesomepersonasauce'
  }));

  // Static files
  app.use(express.static('./app'));

  // Serve up virtual configuration "file"
  app.get('/config.json', function (req, res) {
    res.json({
      eventsLocation: env.get('eventsLocation')
    });
  });

  return app;
};
