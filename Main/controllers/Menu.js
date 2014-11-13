var app = angular.module("main.Menu", ['auth.User']);

app.controller('Menu', ['User', function(User){
  var self = this;
  self.user = User.data;
}]);
