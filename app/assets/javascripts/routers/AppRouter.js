var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'category/:id': 'showDecks',
    'category/:id/:deckId': 'showDeck',
    'user/:id' : 'myDecks'
  },

  showDeck: function(id, deckId) {
    var appView = new app.AppView();
    appView.render();
    app.deck_id = parseInt(deckId);
    app.deck = new app.Deck({id:app.deck_id});
    app.deck.fetch().done( function(){
        var deckView = new app.DeckView({
          model: app.deck
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
