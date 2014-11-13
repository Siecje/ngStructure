var app = angular.module("bundles.editBundle", ['common.NameGetter', 'bundles.BundleService']);

app.controller('editBundle', ['$scope', 'NameGetter', 'BundleService', 'bundle', 'products', 'deliveryCategories', 'modules', 
    function($scope, NameGetter, BundleService, bundle, products, deliveryCategories, modules){
  $scope.getNames = NameGetter.getNames;
  $scope.products = products.data.products;
  $scope.deliveryCategories = deliveryCategories.data.delivery_categories;
  $scope.modules = modules.data.modules;

  $scope.deliveryMethods = [];
  angular.forEach($scope.deliveryCategories, function(category){
    angular.forEach(category.methods, function(method){
      $scope.deliveryMethods.push(method);
    });
  });

  BundleService.resetBundle();
  BundleService.setData(bundle.data);
  $scope.bundle = BundleService.data;

  $scope.addProduct = BundleService.addProduct;
  $scope.resetProducts = BundleService.resetProducts;

  $scope.addDeliveryMethod = BundleService.addDeliveryMethod;
  $scope.resetDeliveryMethods = BundleService.resetDeliveryMethods;

  $scope.updateBundle = function(){
    BundleService.updateBundle().success(function(result){
      $scope.currentModule = {};
    });
  }

  $scope.currentModule = {};
  $scope.setCurrentModule = function(module){
    $scope.currentModule = module;
  }

  $scope.isCurrentModule = function(module){
    if ($scope.currentModule){
      return $scope.currentModule.id === module.id;
    }
  }

  $scope.moduleInBundle = BundleService.moduleInBundle;
  $scope.addModuleToBundle = function(module){
    BundleService.addModuleToBundle(module);
    $scope.currentModule = {};
  }
  $scope.removeModuleFromBundle = BundleService.removeModuleFromBundle;

}]);
