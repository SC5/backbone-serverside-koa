var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  // Fetch the URL from config
  url: 'http://localhost:8080/api/items/'
});
