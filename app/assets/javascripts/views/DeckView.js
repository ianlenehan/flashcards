var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#cards',

  events: {
    'click #play' : 'playDeck',
    'click #fav' : 'favouriteDeck'
  },

    playDeck: function() {
      console.log("play deck caled");
      app.router.navigate(deckId, true);
    },

    favouriteDeck: function() {
      console.log("favourited");
    },

  render: function() {
    $('#deckList').remove();
    this.$el.append('<h2>'+this.model.attributes.name+'</h2>');
    this.$el.append('<button id="play">Play this deck!</button><br>');
    this.$el.append('<button id="fav">Favourite this deck!</button><br>');


    _.each(this.model.attributes.cards, function (card) {
      var cardObject = card;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template( cardTemplate );
      $('#cards').append( cardHTML( cardObject ) );
    });

  }



});
