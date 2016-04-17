var app = app || {};

$(document).ready(function() {
  app.router = new app.AppRouter();
  app.currentUser = new app.CurrentUser();
  Backbone.history.start();

  $('#admin-button').on('mouseover', function () {
    $('#admin-links').fadeIn();
  });

  $('#admin-links').on('click', function () {
    $('#admin-links').fadeOut();
  });
});
