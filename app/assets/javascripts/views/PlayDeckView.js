var app = app || {};

app.PlayDeckView = Backbone.View.extend({

  el: "#primaryContent",

  events: {

  },

  render: function() {
     this.$el.empty();
     $playCard = $('<div>').attr('id', 'playCard');
     this.$el.append($playCard);
     app.playCardView = new app.PlayCardView();
     app.playCardView.render();
  },

});
