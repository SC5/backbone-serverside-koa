// Isomorphic Koa middleware
var path = require('path'),
    fs = require('fs'),
    vm = require('vm'),
    util = require('util'),
    _ = require('underscore'),
    Handlebars = require('handlebars'),
    cheerio = require('cheerio'),
    adapters = require('backbone-serverside-adapters');

exports = module.exports = function initialize(htmlPath, appPath) {
  // Index file path and a handle to the file
  var html,
      app;

  // Inject Cheerio and Backbone adapters
  adapters.cheerio.inject(cheerio);

  // Initialises the resources that will be updated every now and then
  function initResources() {
    console.log('Initialising HTML and app resources');
    html = fs.readFileSync(htmlPath, 'utf8'),
    app = vm.createScript(fs.readFileSync(appPath), appPath);
  }

  // Isometric KOA handler
  function *isomorphic() {
    // Parse the Backbone compatible path from request path
    var req = this.request,
        path = req.path.substr(1, req.path.length)
    console.log('Routing to \'%s\'', path);

    // Check whether the rendering is explicitely asked to be turned off
    var toggle = req.query && req.query.server ? req.query.server : 'on';
    if (toggle === 'off') {
      this.body = html;
      return;
    }

    // Execute the app in its own context
    var $ = cheerio.load(html),
        sandbox = {
          console: console,
          // Provide globals for monkey patching: Cheerio and server-side adapters
          '$': $,
          adapters: adapters
        },
        context = vm.createContext(sandbox),
        App;

    // Run the app
    app.runInContext(context);
    App = context.app;

    // Start the app
    App.start();
    App.router.navigate(path, { trigger: true });

    // Wait for the event, then serve the response
    yield _.bind(App.wait, App);

    this.body = $.html();
  }

  // Initialize the resources
  initResources();

  // Watch for changes
  var callback = _.bind(initResources, this);
  [htmlPath, appPath].forEach(function(path) {
    fs.watchFile(path,callback);
  });

  // Return the per-request handler
  return isomorphic;
};
