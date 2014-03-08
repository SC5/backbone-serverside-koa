var Backbone = require('backbone'),
    _ = require('underscore'),
    App = require('./app'),
    MasterView = require('./views/master'),
    DetailsView = require('./views/details'),
    ItemsCollection = require('./collections/items');

console.log('Loading router');

module.exports = Backbone.Router.extend({
  selector: '#main',

  routes: {
    // These routes are the 'app level pages' that do not necessarily map
    // one-to-one with views
    '':  'item',
    'items/:item': 'item'
  },

  items: new ItemsCollection(),

  views: {
    master: null,
    details: null
  },

  initialize: function(options) {
    console.log('Router initializing');

    // Create the views so that they won't need to be re-created and append
    // to DOM; Hide them by default
    this.views.master = new MasterView({ collection: this.items });
    this.views.details = new DetailsView({ collection: this.items });

    // Create a lock & release mechanism so that we can keep track of the app
    App.listenTo(this.items, 'request', _.bind(App.lock, App));
    App.listenTo(this.items, 'sync', _.bind(App.unlock, App));
    App.listenTo(this.items, 'error', _.bind(App.unlock, App));

    // Append them to DOM root
    Backbone.$(this.selector)
      .html(this.views.master.$el)
      .append(this.views.details.$el);
  },

  item: function(item) {
    // Tell the details view which model to render
    this.views.details.item = item;
    this.items.fetch();
  }
});
