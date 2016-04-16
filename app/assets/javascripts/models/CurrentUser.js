var app = app || {};

app.CurrentUser = Backbone.Model.extend({
  url: '/users/current_user'
});
