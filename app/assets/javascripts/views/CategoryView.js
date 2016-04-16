var app = app || {};

app.CategoryView = Backbone.View.extend({

  el: '#categoryList',
  events: {
    'click .category' : 'showDecks'
  },

  showDecks: function(e) {
    var categoryId = (e.currentTarget.dataset.categoryid);
    app.router.navigate('/category/'+ categoryId, true);
  },
  render: function () {
    _.each(this.collection.models, function (category) {
      $('#categoryList').append('<div class="category" data-categoryid="'+category.attributes.id+'">' + category.attributes.name + '</div>');
    });

  }

});
