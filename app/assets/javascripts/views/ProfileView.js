var app = app || {};

app.ProfileView = Backbone.View.extend({

  el: '#profilePage',

  showProfile: function() {
    // var userID = $('#user-id').html();
    app.currentUser = new app.CurrentUser();
    app.currentUser.fetch().done( function () {
      app.router.navigate('/user/'+ app.currentUser, true);
    });
  },

  // render: function() {
  //   app.currentUser.fetch().done(function() {
  //     var profileViewTemplate = $('#profileViewTemplate').html();
  //     var profileViewHTML = _.template(profileViewTemplate);
  //     $('#profilePage').html(profileViewHTML(app.currentUser.toJSON()));
  //   });


  // }

});
