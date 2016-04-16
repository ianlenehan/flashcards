var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#main',

  render: function () {
    var deckView = new app.deckView();
    $('#main').html('');

    deckView.render();
  }

});
