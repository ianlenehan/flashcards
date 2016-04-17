var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#deck',

  events: {
    'click #play' : 'playDeck',
    'click h2' : 'favouriteDeck'
  },

    playDeck: function() {
      console.log("play deck caled");
      app.router.navigate(deckId, true);
    },

    favouriteDeck: function() {
      console.log("fav");
    },

  render: function() {
    $('#deckList').remove();
    $('#cards').append('<h2>'+this.model.attributes.name+'</h2>');
    $('#cards').append('<button id="play">Play this deck!</button><br>');
    $('#cards').append('<button id="fav">Favourite this deck!</button><br>');
// debugger;

    _.each(this.model.attributes.cards, function (card) {
      var cardObject = card;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template( cardTemplate );
      $('#cards').append( cardHTML( cardObject ) );
    });

  }



});
