var app = app || {};

app.Category = Backbone.Model.extend({
  urlRoot: "/categories",

  defaults: {
    name: 'default name'
  }

});
