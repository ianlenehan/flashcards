var app = app || {};

app.DecksView = Backbone.View.extend({
  el: '#deckList',
  render: function() {


    _.each(this.collection, function (deck) {
      $('#deckList').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '</div>');
    });

  }


});
