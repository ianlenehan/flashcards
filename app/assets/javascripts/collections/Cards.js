var app = app || {};

app.Cards = Backbone.Collection.extend({
  url: '/cards',
  model: app.Card,

  initialize: function () {

  }

});
