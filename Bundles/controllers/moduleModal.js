var app = angular.module("bundles.ModuleModal", []);

app.controller('ModuleModal', ['$scope', '$modalInstance', 'module',
    function($scope, $modalInstance, module){
  $scope.module = module;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
