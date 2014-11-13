var app = angular.module("labs.DeleteLabModal", []);

app.controller('DeleteLabModal', ['$scope', '$modalInstance', 'Objects', 'lab',
    function($scope, $modalInstance, Objects, lab){
  $scope.lab = lab;
  $scope.confirm = function(){
    Objects.deleteLab($scope.lab.id);
    $modalInstance.close(true);
  }
}]);

