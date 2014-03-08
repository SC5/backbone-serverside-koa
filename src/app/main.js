// If the client-side rendering is not explictly turned off, start the app
if (location.search.match(/browser=off/)) {
  console.log('Disabling client-side processing');
  return;
}

var app = require('./app.js'),
    $ = require('jquery');

$(document).ready(function() {
  app.start();
});

// No exports created from this root level file
