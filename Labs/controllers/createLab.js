var app = angular.module("labs.createLab", ['common.NameGetter', 'labs.LabService']);

app.controller('createLab', ['$scope', 'growl', 'NameGetter', 'LabService', 'deliveryCategories',
    function($scope, growl, NameGetter, LabService, deliveryCategories){
  $scope.getNames = NameGetter.getNames;
  $scope.deliveryCategories = deliveryCategories.data.delivery_categories;

  $scope.deliveryMethods = [];
  angular.forEach($scope.deliveryCategories, function(category){
    angular.forEach(category.methods, function(method){
      $scope.deliveryMethods.push(method);
    });
  });

  LabService.reset();
  $scope.lab = LabService.data;
  
  $scope.addDeliveryMethod = LabService.addDeliveryMethod;
  $scope.resetDeliveryMethods = LabService.resetDeliveryMethods;

  $scope.createLab = function(){
    LabService.createLab().error(function(result){
      growl.addErrorMessage(result.message);
    });
  };

}]);

