var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#main',

  events: {
    'click button' : 'favouriteDeck'
  },

  favouriteDeck: function() {
    console.log("fav");
  },

  render: function() {
    var appViewTemplate = $('#appViewTemplate').html();
    this.$el.html(appViewTemplate);

    var sidebarView = new app.SidebarView();
    sidebarView.render();

  }

});
