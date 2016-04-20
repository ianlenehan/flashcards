var app = app || {};

app.Scores = Backbone.Collection.extend({
  url: '/scores',
  model: app.Score,

  initialize: function () {

  }

});
