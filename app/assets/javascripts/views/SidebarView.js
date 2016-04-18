var app = app || {};

app.SidebarView = Backbone.View.extend({

  el: '#sidebar',

  events: {
    'click #mydecksfilter' : 'myDecksView',
    'click #myfavsfilter' : 'myFavsView'
  },

  myDecksView: function () {
    app.currentUser = new app.CurrentUser();
    app.currentUser.fetch().done( function () {
      console.log(app.currentUser.id);
      app.router.navigate('/user/' + app.currentUser.id + '/mydecks', true);
    });
  },

  myFavsView: function () {
    app.currentUser = new app.CurrentUser();
    app.currentUser.fetch().done( function () {
      console.log(app.currentUser.id);
      app.router.navigate('/user/' + app.currentUser.id + '/myfavs', true);
    });
  },

  render: function() {
    app.currentUser.fetch().done(function() {
      var sidebarViewTemplate = $('#sidebarViewTemplate').html();
      var sidebarViewHTML = _.template(sidebarViewTemplate);
      $('#sidebar').html(sidebarViewHTML(app.currentUser.toJSON()));
      $('#sidebar').append('<button class="filterbutton" id="mydecksfilter">My Decks</button>');
      $('#sidebar').append('<button class="filterbutton" id="myfavsfilter">Favourited Decks</button>');
    });


  }



});
