var app = app || {};

app.SidebarView = Backbone.View.extend({

  el: '#sidebar',

  render: function() {
    var sidebarViewTemplate = $('#sidebarViewTemplate').html();
    this.$el.html(sidebarViewTemplate);
  }

});
