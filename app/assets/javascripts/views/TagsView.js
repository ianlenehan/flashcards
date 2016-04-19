var app = app || {};

app.TagsView = Backbone.View.extend({
  el: '#tagList',
  events: {

  },
  render: function() {
    console.log("tags view render called");
    _.each(this.collection, function(tag) {
      var $tagSpan = $('<span>');
      $tagSpan.text(tag);
      $('#tagList').append($tagSpan);
    });
  }
});
