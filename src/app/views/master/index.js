var Backbone = require('backbone'),
    template = require('./template.hbs');

console.log('Loading master view');

module.exports = Backbone.View.extend({
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    // Render the template into a HTML
    console.log('Rendering master view');
    var context = { collection: this.collection.toJSON() },
        html = this.template(context);

    // Replace the element contents
    this.$el.html(html);

    return this;
  }
});
