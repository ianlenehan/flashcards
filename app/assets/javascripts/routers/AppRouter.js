var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'category/:id': 'showDecks',
    'category/:id/:deckId': 'showDeck',
    'decks/:id/play': 'playDeck',
    'user/:id' : 'myDecks'
  },

  showDeck: function(id, deckId) {
    var appView = new app.AppView();
    appView.render();
    app.deck_id = parseInt(deckId);
    app.deck = new app.Deck({id:app.deck_id});
    app.deck.fetch().done( function(){
        var deckView = new app.DeckView({
          model: app.deck,
        });
        deckView.render();
    });

  },

  showDecks: function(id) {
    var appView = new app.AppView();
    appView.render();
    app.cat_id = parseInt( id );

    var category = new app.Category({id:id});
    category.fetch().done(function() {

      app.decks = new app.Decks();
      app.decks.fetch().done(function(){

        var matchingDecks = app.decks.where({
          category_id: app.cat_id
        });
        var decksView = new app.DecksView({
            collection: matchingDecks,
            model: category
        });
        decksView.render();
      });
    });
  },

  myDecks: function() {
    var appView = new app.AppView();
    appView.render();
    var profileView = new app.ProfileView();
    profileView.render();
    app.decks = new app.Decks();
    app.decks.fetch().done( function () {
      app.user_id = parseInt($('#user-id').text());

      app.myDecks = app.decks.where({
        user_id: app.user_id
      });
      app.decksView = new app.DecksView({
        collection: app.myDecks,
      });
      app.decksView.myDecksRender();
    });
  },

  playDeck: function(deckId) {

    if (app.gameState) {
      // If gameState exists, and is for same deck as attempted navigation, render playDeckView.
      // If gameState is for a different deck, redirect to it.
      if (app.gameState.currentDeck === deckId ) {
        if (app.deck && app.deck.get('id') === deckId) {
          console.log("branch 1 ran");
          var playDeckView = new app.PlayDeckView( { model: app.deck } );
          playDeckView.render();
        } else {
          console.log("branch 2 ran");
          app.deck = new app.Deck({ id: parseInt(deckId) });
          app.deck.fetch().done(function() {
            var playDeckView = new app.PlayDeckView( { model: app.deck } );
            playDeckView.render();
          });
        }
      } else {
        console.log("branch 3 ran");
        app.router.navigate('/decks/'+ deckId + '/play', true);
      }
    } else {
      console.log("Branch 4 ran");
      // If no game state, create a new game state object and save it to localStorage
      // then render playDeckView.
      app.deck = new app.Deck({ id: parseInt(deckId) });
      app.deck.fetch().done(function() {

        console.log(app.deck);

        var cards = app.deck.attributes.cards;
        cards = _.shuffle(cards);

        var newGameState = {
            gameInProgress: true,
            currentDeck: deckId,
            currentCard: 0,
            gameDetails: cards
        };

        app.gameState = newGameState;
        app.basil.set("gameState", app.gameState);

        var playDeckView = new app.PlayDeckView( { model: app.deck } );
        playDeckView.render();
      });

    }
  },

  index: function() {
    var appView = new app.AppView();
    appView.render();
    app.categories = new app.Categories();
    app.categories.fetch().done( function () {
      var categoryView = new app.CategoryView( { collection : app.categories });
      categoryView.render();
    });
  }


});
