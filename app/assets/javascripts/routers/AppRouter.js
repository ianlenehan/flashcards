var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index'
  },

  index: function() {
    var appView = new app.AppView();
    appView.render();

    app.categories = new app.Categories();
    app.categories.fetch().done( function () {
      var categoryView = new app.CategoryView( { collection : app.categories });
      categoryView.render();
    });

  }


});
