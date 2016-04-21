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
    this.$el.empty();
    console.log(app.favArray);
    $('#categoryList').remove();
    app.categoryName = this.model.attributes.name;
    app.categoryId = this.model.attributes.id;
    this.$el.append('<h2>'+app.categoryName+' Decks </h2>');
    $('.activeTagsContainer').remove();
    this.$el.append('<div class="activeTagsContainer"></div>');




    _.each(app.activeTags, function(tag){
      $tagsDiv = $('.activeTagsContainer');
      $tagSpan = $('<span>');
      $tagSpan.text(tag);
      $tagSpan.attr('data-tagName', tag);
      $tagSpan.addClass('tagSpan');
      $tagsDiv.append($tagSpan);
      $tagsDiv.append('<span class="x">x</span>');
    });

    _.each( $('.tagSpan'), function(tagItem) {

      $(tagItem).on('click', function(event) {

        app.activeTags = _.filter(app.activeTags, function(tag) {
          console.log($(event.target).text());
          return tag !== $(event.target).text();
        });
        app.tagsView.render();
      });
    });


    this.$el.append('<div id="decks"></div>');

    _.each(this.collection, function (deck) {
      $('#decks').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '<p>Owned by '+ deck.attributes.user.name_first+' '+deck.attributes.user.name_last+'</p></div>');
    });



  },

  myDecksRender: function() {
    $('#categoryList').remove();
    var that = this;
    app.currentUser.fetch().done( function () {
      app.name_first = app.currentUser.attributes.name_first;
      app.name_last = app.currentUser.attributes.name_last;

    that.$el.append("<h2>" + app.name_first + " " + app.name_last + "'s Decks</h2>");
    that.$el.append('<div id="decks"></div>');

    _.each(that.collection, function (deck) {
      $('#decks').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '</div>');
    });
    });

  }


});
