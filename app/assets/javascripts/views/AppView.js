var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#main',

  render: function () {
    var appViewTemplate = $('#appViewTemplate').html();
    console.log(appViewTemplate);
    this.$el.html(appViewTemplate);

    // var categoryView = new app.CategoryView();
    // categoryView.render();
  }

});
