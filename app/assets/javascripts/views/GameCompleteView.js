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
    currentUser.fetch().done( function() {
      var toMyFavourites = '#user/' + currentUser.id + '/favourites';
      var backToFavouritesLink = $('<a>').attr('href', toMyFavourites ).text('Back to My Favourites');
      $('#actions').html(backToFavouritesLink);
    } );

  }

});

// <script id="gameCompleteTemplate "type="text/template">
//   <h1 id="pageTitle"></h1>
//   <div id="gameResults">
//     <h3 id="rawScore"></h3>
//     <h3 id="percentScore"></h3>
//   </div>
//   <div id="actions">
//   </div>
// </script>
