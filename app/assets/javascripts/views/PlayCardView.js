var app = app || {};

app.PlayCardView = Backbone.View.extend({

  el: '#playCard',

  events: {
    'click #submit-answer': 'checkAnswer',
    'click #next-card': 'getNextCard',
    'click #finish-game': 'finishGame'
  },

  render: function() {
    this.$el.empty();
    var gameState = app.basil.get("gameState");
    var currentCardIndex = gameState.currentCardIndex;
    var currentDeck = gameState.currentDeck;
    var gameDetails = gameState.gameDetails;

    // Stores the actual card object for the template, ie. question, answer etc
    var cardToPlay = gameDetails[currentCardIndex];

    var playCardTemplate = $('#playCardTemplate').html();
    var playCardHTML = _.template(playCardTemplate);
    this.$el.html( playCardHTML(cardToPlay) );

  },

  checkAnswer: function() {
    console.log("checkAnswer called");

    $('.play-flipper').addClass('toggle-flip');

    var gameState = app.basil.get("gameState");
    var currentCard = gameState.gameDetails[gameState.currentCardIndex];
    var userAnswer = $('#input-answer').val().trim();
    currentCard.userAnswer = userAnswer;

    var correctAnswer = currentCard.answer;


    var editDistance = window.Levenshtein.get(userAnswer.toLowerCase(), correctAnswer.toLowerCase());

    if (editDistance === 0) {
      // Correct
      currentCard.correct = true;

    } else {
      // Incorrect
      currentCard.correct = false;
    }



     if (gameState.currentCardIndex === gameState.gameDetails.length - 1) {
       this.$el.append('<button id="finish-game">Finish Game</button>');
       app.basil.set("gameState", gameState);
     } else {
       this.$el.append('<button id="next-card">Next Card</button>');
       gameState.currentCardIndex += 1;
       app.basil.set("gameState", gameState);
     }


  },

  getNextCard: function() {
    app.playCardView.render();
  },

  finishGame: function() {
    console.log("Finished Game");
    console.log(app.basil.get("gameState"));
  }

});
