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

  getBadgeClass: function(score) {
    if (score < 50) {
      return 'youngScholar';
    } else if (score < 100) {
      return 'firstFifty';
    } else if (score < 200) {
      return 'hundredClub';
    } else if (score < 300) {
      return 'twoHundredClub';
    } else if (score < 400) {
      return 'threeHundredClub';
    } else if (score < 600) {
      return 'bookWorm';
    } else if (score < 800) {
      return 'highAchiever';
    } else if (score < 1500) {
      return 'silverCircle';
    } else if (score < 3000) {
      return 'goldCircle';
    } else {
      return 'ninja';
    }
  },

  render: function() {
    var that = this;
    app.currentUser.fetch().done(function() {
      var sidebarViewTemplate = $('#sidebarViewTemplate').html();
      var sidebarViewHTML = _.template(sidebarViewTemplate);
      $('#sidebar').html(sidebarViewHTML(app.currentUser.toJSON()));
      $('#sidebar').append('<div id="filter-buttons"><button class="filterbutton" id="mydecksfilter">My Decks</button><br><button class="filterbutton" id="myfavsfilter">Favourited Decks</button></div');
      var badgeClass = that.getBadgeClass(app.currentUser.get('lifetime_score'));
      var $badge = $('<div id="badge"></div>').addClass( badgeClass );
      $('#profilePicture').append($badge);


      });

  }



});
