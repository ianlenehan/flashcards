var app = app || {};

$(document).ready(function() {
  app.router = new app.AppRouter();
  Backbone.history.start();

  $('#admin-button').on('mouseover', function () {
    $('#admin-links').fadeIn();
  });

  $('#admin-button').on('mouseout', function () {
    $('#admin-links').fadeOut();
  });
});
