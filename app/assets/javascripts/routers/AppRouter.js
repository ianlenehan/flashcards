var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'category/:id': 'showDecks',
    'category/:id/:deckId': 'showDeck',
    'decks/:id/play': 'playDeck',
    'user/:id/:filter': 'myDecks',
    'finish': 'finishGame'
  },

  finishGame: function() {
    console.log("Finish game called");

    var gameState = app.basil.get("gameState");
    var rawScore = this.calculateRawScore(gameState);
    var percentScore = this.calculatePercentScore(gameState);
    var deckId = gameState.currentDeckId;
    app.basil.remove("gameState");
    var score = new app.Score();
    app.currentUser.fetch().done(function() {
      score.set({ score: {
          user_id: app.currentUser.toJSON().id,
          deck_id: deckId,
          score: rawScore,
          percent_score: percentScore
        }
      });
      score.save();

    });
    app.gameState = undefined;


  },

  calculateRawScore: function(gameState) {
    var rawScore = 0;
    _.each(gameState.gameDetails, function(card) {
      if (card.correct) {
        rawScore += 1;
      }
    });
    return rawScore;
  },

  calculatePercentScore: function(gameState) {
    var rawScore = this.calculateRawScore(gameState);
    var maxPossibleScore = gameState.gameDetails.length;
    var percentScore = rawScore / maxPossibleScore * 100;
    return percentScore;
  },

  showDeck: function(id, deckId) {
    var appView = new app.AppView();
    appView.render();
    app.deck_id = parseInt(deckId);
    app.deck = new app.Deck({
      id: app.deck_id
    });
    app.deck.fetch().done(function() {
      var deckView = new app.DeckView({
        model: app.deck,
      });
      deckView.render();
    });

  },

  showDecks: function(id) {
    var appView = new app.AppView();
    appView.render();
    app.cat_id = parseInt(id);

    var category = new app.Category({
      id: id
    });
    category.fetch().done(function() {

      app.decks = new app.Decks();
      app.decks.fetch().done(function() {

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

  myDecks: function(id, filter) {
    var user_id = parseInt(id);
    app.decks = new app.Decks();
    var appView = new app.AppView();
    appView.render();
    if (filter === "mydecks") {
      app.decks.fetch().done(function() {
        app.myDecks = app.decks.where({
          user_id: app.currentUser.id
        });
        app.decksView = new app.DecksView({
          collection: app.myDecks,
        });
        app.decksView.myDecksRender();
      });

    } else {

      app.favourites = new app.Favourites();
      app.favourites.fetch().done(function() {
        app.myFaves = app.favourites.where({
          user_id: user_id
        });
        var faves = [];
        _.each(app.myFaves, function(fave) {
          faves.push(fave.attributes.deck_id);
        });
        app.decks.fetch().done( function () {
          var filteredDecks = app.decks.filter( function (deck) {
            return _(faves).contains( deck.get('id'));
          });
            app.decksView = new app.DecksView({
              collection: filteredDecks,
            });
            app.decksView.myDecksRender();
          });
        });
    }
  },

  playDeck: function(deckId) {

    if (app.gameState) {
      // If gameState exists, and is for same deck as attempted navigation, render playDeckView.
      // If gameState is for a different deck, redirect to it.
      if (app.gameState.currentDeck === deckId) {
        if (app.deck && app.deck.get('id') === deckId) {
          console.log("branch 1 ran");
          var playDeckView = new app.PlayDeckView({
            model: app.deck
          });
          playDeckView.render();
        } else {
          console.log("branch 2 ran");
          app.deck = new app.Deck({
            id: parseInt(deckId)
          });
          app.deck.fetch().done(function() {
            var playDeckView = new app.PlayDeckView({
              model: app.deck
            });
            playDeckView.render();
          });
        }
      } else {
        console.log("branch 3 ran");
        app.router.navigate('/decks/' + deckId + '/play', true);
      }
    } else {
      console.log("Branch 4 ran");
      // If no game state, create a new game state object and save it to localStorage
      // then render playDeckView.
      app.deck = new app.Deck({
        id: parseInt(deckId)
      });
      app.deck.fetch().done(function() {

        console.log(app.deck);

        var cards = app.deck.attributes.cards;
        cards = _.shuffle(cards);

        var newGameState = {
          gameInProgress: true,
          currentDeckId: deckId,
          currentCardIndex: 0,
          gameDetails: cards
        };

        app.gameState = newGameState;
        app.basil.set("gameState", app.gameState);

        var playDeckView = new app.PlayDeckView({
          model: app.deck
        });
        playDeckView.render();
      });

    }
  },

  index: function() {
    var appView = new app.AppView();
    appView.render();
    app.categories = new app.Categories();
    app.categories.fetch().done(function() {
      var categoryView = new app.CategoryView({
        collection: app.categories
      });
      categoryView.render();
    });
  }


});
