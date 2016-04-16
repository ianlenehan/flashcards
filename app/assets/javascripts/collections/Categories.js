var app = app || {};

app.Categories = Backbone.Collection.extend({
  url: '/categories',
  model: app.Category,

  initialize: function () {
  
  }

});
