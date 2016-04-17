var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#deck',

  render: function() {
    // debugger;
    $('#deckList').remove();
    $('#cards').append('<h2>'+this.model.attributes.name+'</h2>');

    _.each(this.model.attributes.cards, function (card) {
      var cardObject = card;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template( cardTemplate );
      $('#cards').append( cardHTML( cardObject ) );
    });

  }


});
