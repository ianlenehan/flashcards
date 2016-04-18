var app = app || {};

app.PlayCardView = Backbone.View.extend({

  el: '#playCard',

  events: {
    'click #submit-answer': 'checkAnswer'
  },

  render: function() {
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



    gameState.currentCardIndex += 1;
    app.basil.set("gameState", gameState);


  }

});
