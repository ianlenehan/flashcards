var app = app || {};

app.GameCompleteView = Backbone.View.extend({
  el: '#primaryContent',

  render: function() {

    this.$el.empty();

    var gameCompleteTemplate = $('#gameCompleteTemplate').html();
    this.$el.append(gameCompleteTemplate);

    // Pull out the gamesState one last time
    var gameState = app.basil.get("gameState");

    $('#pageTitle').text('Game Summary!');
    $('#rawScore').text('You scored: ' + gameState.rawScore + ' / ' + gameState.gameDetails.length);
    $('#percentScore').text("That's " + gameState.percentScore + "%");

    currentUser = new app.CurrentUser();
    currentUser.fetch().done(function() {
      var toMyFavouritesURL = '#user/' + currentUser.id + '/favourites';
      var backToFavouritesLink = $('<a>').attr('href', toMyFavouritesURL).text('Back to My Favourites');
      var playAgainURL = '#decks/' + gameState.currentDeckId + "/play";
      var playAgainLink = $('<a>').attr('href', playAgainURL).text('Play Again');

      // ADD SCORES IN HERE!!!

      var historicalScores = new app.Scores();

      historicalScores.fetch({
        traditional: true,
        data: {
          deckId: gameState.currentDeckId
        }
      }).done(function() {

        var dataToDisplay = _.map(historicalScores.models, function(model) {
          return model.attributes.percent_score;
        });



        var chartCanvas = $("<canvas id='scoresGraph'></canvas>");
        console.log("Chart Canvas is", chartCanvas);

        $('#scoresGraphContainer').append(chartCanvas);
        console.log("Score graph containet is ", $('#scoresGraphContainer'));


        var ctx = $("#scoresGraph").get(0).getContext("2d");
        console.log("context is ", ctx);

        var data = {
          labels: ["", "", "", "", ""],
          datasets: [{
            label: "Recent Deck Results",
            backgroundColor: "#9AEAF9",
            data: dataToDisplay.reverse()
          }]
        };


        var myLineChart = new Chart(ctx, {
          type: "line",
          data: data,
          options: {
      			scales: {
      				yAxes: [{
      						ticks: {
      							beginAtZero: false
      						}
      					}]
      			}
          }
        });

      });

      $('#actions').append(playAgainLink, backToFavouritesLink);

    });


    app.basil.remove("gameState");
    app.gameState = undefined;
  }

});
