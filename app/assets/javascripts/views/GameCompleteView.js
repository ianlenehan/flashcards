var app = app || {};

app.GameCompleteView = Backbone.View.extend({

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
    this.$el.addClass('animated rollIn');


  },

  checkAnswer: function() {
    $('#submit-answer').hide();
    $('#input-answer').hide();
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
      setTimeout(function(){
        $('.correct').removeClass('hidden').addClass('animated fadeInDown');
      }, 800);




    } else {
      // Incorrect
      currentCard.correct = false;
      setTimeout(function(){
        $('.incorrect').removeClass('hidden').addClass('animated fadeInDown');
      }, 800);

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
    this.$el.removeClass('animated rollIn');
    this.$el.addClass('animated zoomOutRight');

    setTimeout(function(){
      $('#playCard').removeClass('animated zoomOutRight');
      app.playCardView.render();
    }, 500);

  },

  finishGame: function() {
    app.router.navigate('/finish', true);
  }

});
