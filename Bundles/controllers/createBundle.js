var app = angular.module("bundles.createBundle", ['common.NameGetter', 'bundles.BundleService']);

app.controller('createBundle', ['$scope', 'growl', 'NameGetter', 'BundleService', 'products', 'deliveryCategories',
    function($scope, growl, NameGetter, BundleService, products, deliveryCategories){
  $scope.getNames = NameGetter.getNames;
  $scope.products = products.data.products;
  $scope.deliveryCategories = deliveryCategories.data.delivery_categories;

  $scope.deliveryMethods = [];
  angular.forEach($scope.deliveryCategories, function(category){
    angular.forEach(category.methods, function(method){
      $scope.deliveryMethods.push(method);
    });
  });

  BundleService.resetBundle();
  $scope.bundle = BundleService.data;

  $scope.addProduct = BundleService.addProduct;
  $scope.resetProducts = BundleService.resetProducts;
  
  $scope.addDeliveryMethod = BundleService.addDeliveryMethod;
  $scope.resetDeliveryMethods = BundleService.resetDeliveryMethods;

  $scope.createBundle = function(){
    BundleService.createBundle().error(function(result){
      growl.addErrorMessage(result.message);
    });
  };

}]);

