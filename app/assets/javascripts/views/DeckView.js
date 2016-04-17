var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#cards',
  events: {
    'click #play' : 'playDeck'
  },

  playDeck: function() {
      // Pull any existing gameState value from localStorage via Basil
      app.gameState = app.basil.get('gameState');

      // If no gameState found, or gameState.gameInProgress === false, navigate to the requested playDeckView.
      if (app.gameState && app.gameState.gameInProgress === true) {

        var existingGameDeck = app.gameState.currentDeck;
        var requestedGameDeck = app.deck.get("id");
        this.existingGamePrompt(existingGameDeck, requestedGameDeck);

      } else {

        app.router.navigate('/decks/'+ app.deck.get("id") + '/play', true);

      }
  },

  // Creates pop up asking the user to confirm playing new deck if they have a game in progress
  existingGamePrompt: function(existingGameDeck, requestedGameDeck) {
    // THIS IS JUST FOR TESTING PROOF OF CONCEPT, NEEDS TO BE REFACTORED INTO TEMPLATE OR SOMETHING
    var $popUp = $('<div>').addClass('popUp');
    var content = "<button id='toExistingGame'>Play Existing Game</button><button id='toNewGame'>Play New Game</button>";
    $popUp.html(content);
    $('body').prepend($popUp);

    // Click handlers to handle both options
    $('#toExistingGame').on('click', function() {
        app.router.navigate('/decks/'+ existingGameDeck + '/play', true);
    });

    $('#toNewGame').on('click', function() {
        app.basil.remove('gameState');
        app.gameState = null;
        app.router.navigate('/decks/'+ requestedGameDeck + '/play', true);
    });

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
