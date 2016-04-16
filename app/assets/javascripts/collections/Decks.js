var app = app || {};

app.Decks = Backbone.Collection.extend({
  url: '/decks',
  model: app.Deck,

  initialize: function () {

  }

});
