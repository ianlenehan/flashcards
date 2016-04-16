var app = app || {};

app.SidebarView = Backbone.View.extend({

  el: '#sidebar',

  render: function() {
    app.currentUser.fetch().done(function() {
      var sidebarViewTemplate = $('#sidebarViewTemplate').html();
      var sidebarViewHTML = _.template(sidebarViewTemplate);
      $('#sidebar').html(sidebarViewHTML(app.currentUser.toJSON()));
    });


  }

});
