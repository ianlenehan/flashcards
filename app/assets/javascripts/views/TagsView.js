var app = app || {};

app.TagsView = Backbone.View.extend({
  el: '#primaryContent',
  events: {
    'click .tagItem': 'addTagFilter'
  },
  render: function() {
    tagsTemplate = $('#tagsTemplate').html();
    $('#primaryContent').append(tagsTemplate);
    console.log("tags view render called");
    _.each(this.collection, function(tag) {
      var $tagDiv = $('<div>');
      $tagDiv.addClass('tagItem');
      $tagDiv.text(tag);
      $('#tags').append($tagDiv);
    });
  },

  addTagFilter: function(e) {
    var tag = $(e.target).text();

    var categoryDecks = app.decks.where({
      category_id: app.cat_id
    });

    var tagFilteredDecks = categoryDecks.filter(function(deck) {

      return _.contains( deck.attributes.tags,tag);
    });

    var decksView = new app.DecksView({
      collection: tagFilteredDecks,
      model: app.current_category
    });

    decksView.render();




  },


});
