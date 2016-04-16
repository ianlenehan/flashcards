var app = app || {};

$(document).ready(function() {
  app.router = new app.AppRouter();
  Backbone.history.start();
});
