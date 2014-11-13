var app = angular.module("module.main", ['main.Menu']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

  $stateProvider.state('home', {
    url: '^/',
    templateUrl: '/app/Main/templates/home.html',
    publicAccess: true,
  });

}]);
