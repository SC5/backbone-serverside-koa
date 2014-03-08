// Because of circular dependencies, we need to define App before executing require calls
var App = exports = module.exports = {};

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = Backbone.$,
    AppRouter = require('./router');

// Create a simple application singleton that is able to handle the application
// level events for isomorphism etc.
_.extend(App, {
  router: null,

  // A collection of pending events/collections or such that need to be
  // resolved prior to triggering page readiness. The assumption is
  // that there is only one lock per object instance.
  locks: [],

  start: function() {
    console.log('Application starting');
    var $document = Backbone.$('html');

    // Initialize router
    var router = this.router = new AppRouter();

    // Release the locks, if any
    this.locks = [];

    // Hookup into navigation to unnecessary reloading
    $document.delegate('a', 'click', function(event) {
      var a = event.currentTarget,
          path = [ a.pathname, a.query ].join('');

      router.navigate(path, { trigger: true });

      // Prevent default handling of the event
      return false;
    });

    // Start the app here
    Backbone.history.start({ pushState: true, hashChange: false, silent: false, root: '/' });
  },

  // Stops the application & cleans up the environment
  stop: function() {
    console.log('Application stopping');

    // Release the locks, if any
    this.locks = [];

    // Undelegate click handlers
    $document.undelegate('a[data-link="internal"]', 'click');
    Backbone.history.stop();
  },

  // Lock state handling functions
  // TODO The current implementation may leak memory, as it might hold lock for some
  // instances forever
  lock: function(instance) {
    // If we already hold a lock for the object, don't add it again
    if (_.find(this.locks, instance)) {
      console.log('Lock requested for an object that already has a lock');
      return;
    }

    // Append the lock
    //console.log('Adding a lock');
    this.locks.push(instance);

    // Emit busy event
    this.trigger('busy');
  },

  unlock: function(instance) {
    this.locks = _.without(this.locks, instance);

    // If no further locks, emit idle event
    //console.log('Removing a lock');
    this.trigger('idle');
  },

  // Waits until all the locks have been released.
  wait: function(callback) {
    // In case of no locks, we can return immediately
    if (this.locks.length === 0) {
      return callback();
    }

    // In case of locks, wait until they are released
    return this.once('idle', callback);
  }

}, Backbone.Events);
