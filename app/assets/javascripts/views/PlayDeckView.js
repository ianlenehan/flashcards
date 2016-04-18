var app = app || {};

app.PlayDeckView = Backbone.View.extend({

  el: "#primaryContent",

  events: {

  },

  render: function() {
     this.$el.empty();
     $playCard = $('<div>').attr('id', 'playCard');
     this.$el.append($playCard);
     var playCardView = new app.PlayCardView();
     playCardView.render();
  },

});
