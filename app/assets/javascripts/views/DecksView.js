var app = app || {};

app.DecksView = Backbone.View.extend({
  el: '#deckList',

  events: {
    'click .deck': 'showDeck'
  },

  showDeck: function(e) {
    var deckId = (e.currentTarget.dataset.deckid);
    app.router.navigate('/category/'+app.categoryId +'/'+ deckId, true);
  },
  
  render: function() {
    $('#categoryList').remove();
    app.categoryName = this.model.attributes.name;
    app.categoryId = this.model.attributes.id;
    this.$el.append('<h2>'+app.categoryName+' Decks</h2>');
    this.$el.append('<div id="decks"></div>');

    _.each(this.collection, function (deck) {
      $('#decks').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '</div>');
    });

  }


});
