var Backbone = require('backbone'),
    _ = require('underscore');

// Environment-provided globals for runtime patching: $ and adapters
Backbone.$ = $;
adapters.backbone.inject(Backbone);

// Expose app in global scope, so that we can refer to it
app = require('./app.js');

// No exports created from this root level file
