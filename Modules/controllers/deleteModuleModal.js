var app = angular.module("modules.DeleteModuleModal", []);

app.controller('DeleteModuleModal', ['$scope', '$modalInstance', 'Objects', 'module',
    function($scope, $modalInstance, Objects, module){
  $scope.module = module;
  $scope.confirm = function(){
    Objects.deleteModule($scope.module.location);
    $modalInstance.close(true);
  }
}]);

