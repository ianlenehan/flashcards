var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#deck',

  render: function() {
    $('#deckList').remove();
    $('#cards').append('<h2>'+this.model.attributes.name+'</h2>');

    _.each(this.collection.models, function (card) {
      var cardObject = card.attributes;
      var cardTemplate = $('#cardTemplate').html();
      var cardHTML = _.template( cardTemplate );
      $('#cards').append( cardHTML( cardObject ) );
    });

  }


});
