var app = app || {};

app.PlayCardView = Backbone.View.extend({

  el: '#playCard',

  events: {
    'click #submit-answer': 'checkAnswer'
  },

  render: function() {
    var gameState = app.basil.get("gameState");
    var currentCard = gameState.currentCard;
    var currentDeck = gameState.currentDeck;
    var gameDetails = gameState.gameDetails;

    // Stores the actual card object for the template, ie. question, answer etc
    var cardToPlay = gameDetails[currentCard];

    var playCardTemplate = $('#playCardTemplate').html();
    var playCardHTML = _.template(playCardTemplate);
    this.$el.html( playCardHTML(cardToPlay) );

  },

  checkAnswer: function() {
    console.log("checkAnswer called");
    var gameState = app.basil.get("gameState");
    var currentCard = gameState.gameDetails[gameState.currentCard];
    var userAnswer = $('#input-answer').val().trim();
    currentCard.userAnswer = userAnswer;

    var correctAnswer = currentCard.answer;

    //
    var editDistance = window.Levenshtein.get(userAnswer.toLowerCase(), correctAnswer.toLowerCase());

    console.log(editDistance);


  }

});
