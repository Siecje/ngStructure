var app = angular.module("modules.LabModal", []);

app.controller('LabModal', ['$scope', '$modalInstance', 'NameGetter', 'lab',
    function($scope, $modalInstance, NameGetter, lab){
  $scope.lab = lab.data;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
