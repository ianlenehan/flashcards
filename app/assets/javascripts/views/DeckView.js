var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#deck',

  render: function() {
    $('#deckList').remove();

    _.each(this.collection, function (deck) {
      $('#decks').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '</div>');
    });

  }


});
