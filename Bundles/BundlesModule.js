var app = angular.module("module.bundles", ['bundles.bundles', 'bundles.createBundle', 'bundles.editBundle',
'bundles.ModuleModal', 'bundles.DeleteBundleModal']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $stateProvider.state('bundles', {
    url: '^/bundles',
    templateUrl: '/app/Bundles/templates/bundles.html',
    controller: 'Bundles',
    resolve: {
      'bundles': function(Objects){
        return Objects.getBundles();
      }
    },
  });

  $stateProvider.state('createBundle', {
    url: '^/bundles/create',
    templateUrl: '/app/Bundles/templates/createBundle.html',
    controller: 'createBundle',
    resolve: {
      'products': function(Objects){
        return Objects.getProducts();
      },
      'deliveryCategories': function(Objects){
        return Objects.getDeliveryCategories();
      },
    },
  });

  $stateProvider.state('editBundle', {
    url: '^/bundles/:bundleId',
    templateUrl: '/app/Bundles/templates/editBundle.html',
    controller: 'editBundle',
    resolve: {
      'bundle': function($stateParams, Objects){
        return Objects.getBundle($stateParams.bundleId);
      },
      'products': function(Objects){
        return Objects.getProducts();
      },
      'deliveryCategories': function(Objects){
        return Objects.getDeliveryCategories();
      },
      'modules': function(Objects){
        return Objects.getModules();
      },
    },
  });
}]);
