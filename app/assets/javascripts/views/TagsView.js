var app = app || {};

app.TagsView = Backbone.View.extend({
  el: '#primaryContent',
  events: {
    'click .tagItem': 'addTagFilter'

  },
  render: function() {
    $('#tagList').remove();
    tagsTemplate = $('#tagsTemplate').html();
    $('#primaryContent').append(tagsTemplate);
    console.log("tags view render called");

    
    var inactiveTags = _.difference(app.tagsView.collection, app.activeTags);

    _.each(inactiveTags, function(tag) {
      var $tagDiv = $('<div>');
      $tagDiv.addClass('tagItem');
      $tagDiv.text(tag);
      $('#tags').append($tagDiv);
    });

    app.categoryDecks = app.decks.where({
      category_id: app.cat_id
    });

    this.renderWithFilter();
  },

  addTagFilter: function(e) {
    var tag = $(e.target).text();
    $(e.target).hide();
    app.activeTags.push(tag);

    var $tagToToggle = $('#activeTags').find("[data-tagName='" + tag + "']");
    $tagToToggle.removeClass('hidden');


    this.renderWithFilter();

  },

  renderWithFilter: function() {
        var tagFilteredDecks = app.categoryDecks.filter(function(deck) {
          return _.intersection(deck.attributes.tags, app.activeTags).length === app.activeTags.length;

        });

        app.decksView = new app.DecksView({
          collection: tagFilteredDecks,
          model: app.current_category
        });

        app.decksView.render();

  }


});
