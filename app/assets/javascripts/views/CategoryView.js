var app = app || {};

app.CategoryView = Backbone.View.extend({

  el: '#categoryList',

  render: function () {
    // var name = this.collection.models[0].attributes.name;
    _.each(this.collection.models, function (category) {
      $('#categoryList').append('<p>' + category.attributes.name + '</p>');
    });

  }

});
