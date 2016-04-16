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
    this.$el.append('<h2>Categories</h2>');
    this.$el.append('<div id="categories"></div>');

    _.each(this.collection.models, function (category) {
      $('#categories').append('<div class="category" data-categoryid="'+category.attributes.id+'">' + category.attributes.name + '</div>');
    });

  }

});
