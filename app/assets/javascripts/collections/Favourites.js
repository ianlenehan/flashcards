var app = app || {};

app.Favourites = Backbone.Collection.extend({
  url: '/favourites',
  model: app.Favourite,

  initialize: function () {

  }
});
