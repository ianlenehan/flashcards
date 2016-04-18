var app = app || {};

app.MyDecksView = Backbone.View.extend({

  el: '#myDecks',

  showMyDeck: function() {
    app.currentUser = new app.CurrentUser();
    app.currentUser.fetch().done( function () {
      app.router.navigate('/user/'+ app.currentUser, true);
    });
  },

  // render: function() {
  //   app.currentUser.fetch().done(function() {
  //     var myDecksViewTemplate = $('#myDecksViewTemplate').html();
  //     var myDecksViewHTML = _.template(myDecksViewTemplate);
  //     $('#profilePage').html(myDecksViewHTML(app.currentUser.toJSON()));
  //   });


  // }

});
