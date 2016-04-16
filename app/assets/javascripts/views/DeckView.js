var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#deck',

  render: function() {
    $('#deckList').remove();
    _.each(this.collection.models, function (card) {

      var cardObject = card.attributes;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template( cardTemplate );
      $('#cards').append( cardHTML( cardObject ) );
    });

  }


});
