var Backbone = require('backbone'),
    template = require('./template.hbs');

console.log('Loading details view');

module.exports = Backbone.View.extend({
  template: template,
  item: null,

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    // Render the template into a HTML
    console.log('Rendering details view');

    // Try to find the item from the collection; if not found, fallback to first model
    var model = this.collection.get(this.item) || this.collection.at(0),
      context = { model: model.toJSON() },
      html = this.template(context);

    // Replace the element contents
    this.$el.html(html);

    return this;
  }
});
