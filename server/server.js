var Habitat = require('habitat');

Habitat.load();

// Configuration
var env = new Habitat();

// Defaults
if(!env.get('PORT')) {
  env.set('PORT', 1134);
}

if(!env.get('EVENTS_LOCATION')) {
  env.set('EVENTS_LOCATION', 'http://webmaker-events-service.herokuapp.com');
}

// App
var app = require('./config')(env);

// Run server
app.listen(env.get('PORT'), function () {
  console.log('Now listening on %d', env.get('PORT'));
});
