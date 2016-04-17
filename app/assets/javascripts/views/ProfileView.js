var app = app || {};

app.ProfileView = Backbone.View.extend({

  el: '#profilePage',

  showProfile: function() {
    var userID = $('#user-id').html();
    app.router.navigate('/user/'+ userID, true);
  },

  // render: function() {
  //   app.currentUser.fetch().done(function() {
  //     var profileViewTemplate = $('#profileViewTemplate').html();
  //     var profileViewHTML = _.template(profileViewTemplate);
  //     $('#profilePage').html(profileViewHTML(app.currentUser.toJSON()));
  //   });


  // }

});
