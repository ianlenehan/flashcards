var app = app || {};

app.DecksView = Backbone.View.extend({
  el: '#deckList',

  events: {
    'click .deck': 'showDeck'
  },

  renderLoop: function () {
    _.each(this.collection, function (deck) {

      var count = _.countBy(app.favArray, function (id) {
        return id === deck.attributes.id;
      });
      var newCount = 0;
      var word = ' favourites';
      if (count.true === undefined) {
        newCount = 0;
      } else {
        newCount = count.true;
      }
      if (newCount === 1 ) {
        word = " favourite";
      } else {
        word = " favourites";
      }

      $('#decks').append('<div class="deck" data-deckid="'+deck.attributes.id+'">' + deck.attributes.name + '<br><span class="num-favs"><img src="assets/favStar.png"> (' + newCount + ')</span><br><div class="created-by num-favs">Created by: ' + deck.attributes.user.name_first + " " + deck.attributes.user.name_last + '</div></div>');
    });
  },

  showDeck: function(e) {
    var deckId = (e.currentTarget.dataset.deckid);
    app.router.navigate('/category/'+app.categoryId +'/'+ deckId, true);
  },

  render: function() {
    this.$el.empty();
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
      $tagSpan.append('<span class="glyphicon glyphicon-remove close-icon" aria-hidden="true"></span>');
    });

    _.each( $('.tagSpan'), function(tagItem) {

      $(tagItem).on('click', function(event) {
        console.log("click event fired");
        app.activeTags = _.filter(app.activeTags, function(tag) {
          return tag !== $(event.target).parent().text();
        });

        app.tagsView.render();
      });
    });


    this.$el.append('<div id="decks"></div>');

    this.renderLoop();

  },

  myDecksRender: function() {
    $('#categoryList').remove();
    var that = this;
    app.currentUser.fetch().done( function () {
      app.name_first = app.currentUser.attributes.name_first;
      app.name_last = app.currentUser.attributes.name_last;

    that.$el.append("<h2>" + app.name_first + " " + app.name_last + "'s Decks</h2>");
    that.$el.append('<div id="decks"></div>');

    that.renderLoop();
    });

  }

});
