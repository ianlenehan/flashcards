var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#cards',

  events: {
    'click #play': 'playDeck',
    'click #fav': 'favouriteDeck',
    'click .add-icon': 'showDeckDialog',
  },

  playDeck: function() {
    // Pull any existing gameState value from localStorage via Basil
    app.gameState = app.basil.get('gameState');

    // If no gameState found, or gameState.gameInProgress === false, navigate to the requested playDeckView.
    if (app.gameState && app.gameState.gameInProgress === true) {

      var existingGameDeck = app.gameState.currentDeckId;
      var requestedGameDeck = app.deck.get("id");
      this.existingGamePrompt(existingGameDeck, requestedGameDeck);


    } else {

      app.router.navigate('/decks/' + app.deck.get("id") + '/play', true);

    }
    $('#close-dialog').on('click', function () {
      $('.overlay').fadeOut( function() {
        $('.overlay').empty();
      });
    });
  },

  // Creates pop up asking the user to confirm playing new deck if they have a game in progress
  existingGamePrompt: function(existingGameDeck, requestedGameDeck) {
    console.log("hello");
    // THIS IS JUST FOR TESTING PROOF OF CONCEPT, NEEDS TO BE REFACTORED INTO TEMPLATE OR SOMETHING
    var $overlay = $('<div>').addClass('overlay').css({'display':'block'});
    var $dialog = $('<div>').addClass('dialog');
    $overlay.append($dialog);
    var content = "<p id='existingGame'>You already have a game in progress!</p><div class='dialog-buttons'><button id='toExistingGame'>Play Existing Game</button><br><br><button id='toNewGame'>Start New Game</button></div>";
    $dialog.html(content);
    $dialog.append('<img id="close-dialog" src="/assets/closedialog.png" alt="">');
    $('body').prepend($overlay);

    // Click handlers to handle both options
    $('#toExistingGame').on('click', function() {
      $overlay.remove();
      app.router.navigate('/decks/' + existingGameDeck + '/play', true);
    });

    $('#toNewGame').on('click', function() {
      $overlay.remove();
      app.basil.remove('gameState');
      app.gameState = null;
      app.router.navigate('/decks/' + requestedGameDeck + '/play', true);
    });

  },

  favouriteDeck: function(e) {
    e.preventDefault();
    var favourite = new app.Favourite();
    app.favourites = new app.Favourites();
    app.favourites.fetch().done(function() {
      var filtered = app.favourites.filter(function(fave) {
        return fave.get('user_id') === app.currentUser.id && fave.get('deck_id') === app.deck.id;
      });
      if (!filtered.length) {
        favourite.set({
          user_id: app.currentUser.id,
          deck_id: app.deck.id
        });
        favourite.save();
        $('#fav').attr('src', '/assets/favStar.png');
      } else {
        $('#fav').attr('src', '/assets/favStarOff.png');
        filtered[0].destroy();
      }
    });
  },



  showDeckDialog: function(e) {
    var that = this;
    app.cardID = e.currentTarget.dataset.cardId;
    $('.overlay').fadeIn();
    var dialogTemplate = $('#deckDialogTemplate').html();
    var dialogHTML = _.template(dialogTemplate);
    $('.overlay').append(dialogHTML);

    $('#close-dialog').on('click', function () {
      $('.overlay').fadeOut( function() {
        $('.overlay').empty();
      });
    });

    app.decks = new app.Decks();
    app.decks.fetch().done(function() {
      app.userDecks = app.decks.where({
        user_id: app.currentUser.attributes.id
      });
      app.userDeckNames = [];
      _.each(app.userDecks, function(deck) {
        app.userDeckNames.push(deck.attributes.name);
      });
      $('.deck-input').on('keydown', function () {
      });

      $('.deck-input:not(.ui-autocomplete-input)').autocomplete({
        source: app.userDeckNames,
        minLength: 2,
        appendTo: $("#deck-input-div"),
        select: function(event, ui) {

          app.selectedDeck = app.userDecks.filter(function(deck) {
            return deck.get('name') === ui.item.value;
          });
          that.addToDeck(app.selectedDeck[0].attributes.id, app.cardID);
          $('#user-selection').html("Added to your " + ui.item.value + " deck!");
          setTimeout(function(){
            $('.overlay').fadeOut(function () {
              $(this).empty();
            });
          }, 1200);
        }
      });
    });

  },

  addToDeck: function (deck, card) {
    var deckID = parseInt(deck);
    var cardID = parseInt(card);
    $.ajax('/decks/' + deckID + '/add', {
      method: 'post',
      data: {
        card_id : cardID
      }
    });
  },

  render: function() {
    $('#deckList').remove();
    this.$el.append('<h2>' + this.model.attributes.name + '</h2>');
    this.$el.append('<button class="buttons" id="play">Play this deck!</button><br>');
    app.favourites = new app.Favourites();
    var that = this;
    app.favourites.fetch().done(function() {
      app.favourite = app.favourites.filter(function(fave) {
        return fave.get('user_id') === app.currentUser.id && fave.get('deck_id') === that.model.id;
      });
      if (app.favourite.length) {
        $('h2').append('<img id="fav" src="assets/favStar.png">');
      } else {
        $('h2').append('<img id="fav" src="assets/favStarOff.png">');
      }
    });

    _.each(this.model.attributes.cards, function(card) {
      var cardObject = card;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template(cardTemplate);
      $('#cards').append(cardHTML(cardObject));
    });
  }
});
