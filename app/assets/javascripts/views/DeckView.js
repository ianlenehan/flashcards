var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#deck',
  events: {
    'click #play' : 'playDeck'
  },

    playDeck: function() {
      console.log("play deck caled");
      app.router.navigate(deckId, true);

    },
  render: function() {
    $('#deckList').remove();
    $('#cards').append('<h2>'+this.model.attributes.name+'</h2>');
    $('#cards').append('<button id="play">Play this deck!</button><br>');
// debugger;

    _.each(this.model.attributes.cards, function (card) {
      var cardObject = card;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template( cardTemplate );
      $('#cards').append( cardHTML( cardObject ) );
    });

  }



});
