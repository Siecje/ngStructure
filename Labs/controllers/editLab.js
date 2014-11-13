var app = angular.module("labs.editLab", ['common.NameGetter', 'labs.LabService']);

app.controller('editLab', ['$scope', 'NameGetter', 'LabService', 'lab', 'deliveryCategories',
    function($scope, NameGetter, LabService, lab, deliveryCategories){
  $scope.getNames = NameGetter.getNames;
  $scope.deliveryCategories = deliveryCategories.data.delivery_categories;

  $scope.deliveryMethods = [];
  angular.forEach($scope.deliveryCategories, function(category){
    angular.forEach(category.methods, function(method){
      $scope.deliveryMethods.push(method);
    });
  });

  LabService.reset();
  LabService.setData(lab.data);
  $scope.lab = LabService.data;

  $scope.addDeliveryMethod = LabService.addDeliveryMethod;
  $scope.resetDeliveryMethods = LabService.resetDeliveryMethods;

  $scope.updateLab = function(){
    LabService.updateLab();
  }

}]);
