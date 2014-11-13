var app = angular.module("modules.createModule", ['common.NameGetter', 'modules.ModuleService']);

app.controller('createModule', ['$scope', 'growl', 'NameGetter', 'ModuleService',
'labs', 'lectures', 'videos', 'bundles', 'products', 'actors',
    function($scope, growl, NameGetter, ModuleService, 
labs, lectures, videos, bundles, products, actors){
  $scope.getNames = NameGetter.getNames;
  $scope.labs = labs.data.labs;
  $scope.lectures = lectures.data.lectures;
  $scope.videos = videos.data.videos;
  $scope.bundles = bundles.data.bundles;
  $scope.products = products.data.products;
  $scope.actors = actors.data.actors;


  ModuleService.reset();
  $scope.module = ModuleService.data;

  $scope.addProduct = ModuleService.addProduct;
  $scope.resetProducts = ModuleService.resetProducts;

  $scope.addActor = ModuleService.addActor;
  $scope.resetActors = ModuleService.resetActors;
  
  $scope.createModule = function(){
    ModuleService.createModule().error(function(result){
      growl.addErrorMessage(result.message);
    });
  };

}]);
