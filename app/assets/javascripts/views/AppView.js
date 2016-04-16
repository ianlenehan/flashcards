var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#main',

  render: function () {
    var appViewTemplate = $('#appViewTemplate').html();
    this.$el.html(appViewTemplate);

    var categoryView = new app.CategoryView();
    categoryView.render();

    var sidebarView = new app.SidebarView();
    sidebarView.render();
  }

});
