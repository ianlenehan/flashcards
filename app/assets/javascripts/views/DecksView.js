var app = app || {};

app.DecksView = Backbone.View.extend({
  el: '#deckList',
  render: function() {
    $('#categoryList').remove();
    this.$el.append('<h2>'+this.model.attributes.name+' Decks</h2>');
    this.$el.append('<div id="decks"></div>');

    _.each(this.collection, function (deck) {
      $('#decks').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '</div>');
    });

  }


});
