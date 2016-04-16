var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'category/:id': 'showDecks',
    'category/:id/:deckId': 'show Deck'
  },

  showDeck: function(deckId) {
    var appView = new app.AppView();
    appView.render();
    app.deck_id = parseInt(deckId);

    var deck = new app.Deck({id:deckId});
    deck.fetch().done(function(){
      app.cards = new app.Cards();
      app.cards.fetch().done(function(){
        var matchingCards = app.cards.where({
          


        });

      });


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
