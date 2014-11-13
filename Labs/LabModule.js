var app = angular.module("module.labs", ['labs.labs', 'labs.createLab', 'labs.editLab',  'labs.DeleteLabModal']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $stateProvider.state('labs', {
    url: '^/labs',
    templateUrl: '/app/Labs/templates/labs.html',
    controller: 'Labs',
    resolve: {
      'labs': function(Objects){
        return Objects.getLabs();
      }
    },
  });

  $stateProvider.state('createLab', {
    url: '^/labs/create',
    templateUrl: '/app/Labs/templates/createLab.html',
    controller: 'createLab',
    resolve: {
      'deliveryCategories': function(Objects){
        return Objects.getDeliveryCategories();
      },
    },
  });

  $stateProvider.state('editLab', {
    url: '^/labs/:labId',
    templateUrl: '/app/Labs/templates/editLab.html',
    controller: 'editLab',
    resolve: {
      'lab': function($stateParams, Objects){
        return Objects.getLab($stateParams.labId);
      },
      'deliveryCategories': function(Objects){
        return Objects.getDeliveryCategories();
      },
    },
  });
}]);
