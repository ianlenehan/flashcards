var app = app || {};

app.PlayDeckView = Backbone.View.extend({

  el: "#primaryContent",

  events: {

  },

  render: function() {
    console.log("Play deck view render called");
    x = this.model.attributes;
    this.$el.html( JSON.stringify(x));

    //app.gameState = {
    // gameInProgress: *boolean*,
    // currentDeck: *integer*,
    // currentCard: *integer*,
    // gameHistory: [
    //                 {card_id: *integer*,
    //                  answeredCorrectly: *boolean*
    //                 }...
    //               ]
    // }
  },

});
