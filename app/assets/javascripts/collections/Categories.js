var app = app || {};

app.Categories = Backbone.Collection.extend({
  url: '/categories',
  model: app.Category,

  comparator: function(m) {
    return m.get('name');
  },

  initialize: function () {

  }

});
