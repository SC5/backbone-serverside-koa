var path = require('path'),
    koa = require('koa'),
    appServer = koa(),
    serve = require('koa-static'),
    isomorphic = require('./lib/isomorphic.js');

// App config
var port = 8080,
    htmlPath = path.join(__dirname, 'dist/index.html'),
    appPath = path.join(__dirname, 'dist/bundle-server.js');

// Mount the subservices using koa
// First try to match a static file route
appServer.use(serve('dist/assets'));

// Create a tiny API server to handle the demo API endpoint
appServer.use(function *(next) {
  // Only handle the one particular path
  console.log(this.request.path);
  if (this.request.path !== '/api/items/') {
    return yield next;
  }

  var items = [
    {id: '1', name: 'First item', description: 'This is the first item'},
    {id: '2', name: 'Second item', description: 'This is the second item'},
    {id: '3', name: 'Third item', description: 'This is the third item'}
  ];
  this.body = JSON.stringify(items);
});

// Then fallback to isomorphic
appServer.use(isomorphic(htmlPath, appPath));

// Simple error handling
appServer.on('error', function(err){
  console.error('Error:', err);
});

// Listen to the specified port
console.log('Serving the API from port %s', port);
appServer.listen(port);
