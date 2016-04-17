var app = app || {};

app.SidebarView = Backbone.View.extend({

  el: '#sidebar',

  events: {
    'click #profilePicture' : 'profileView'
  },

  profileView: function () {
    app.current_user = $('#user-id').html();
    app.router.navigate('/user/' + app.current_user, true);
  },

  render: function() {
    app.currentUser.fetch().done(function() {
      var sidebarViewTemplate = $('#sidebarViewTemplate').html();
      var sidebarViewHTML = _.template(sidebarViewTemplate);
      $('#sidebar').html(sidebarViewHTML(app.currentUser.toJSON()));
    });


  }



});
