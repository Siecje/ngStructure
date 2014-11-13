var app = angular.module("bundles.DeleteBundleModal", []);

app.controller('DeleteBundleModal', ['$scope', '$modalInstance', 'Objects', 'bundle',
    function($scope, $modalInstance, Objects, bundle){
  $scope.bundle = bundle;
  $scope.confirm = function(){
    Objects.deleteBundle($scope.bundle.id);
    $modalInstance.close(true);
  }
}]);

