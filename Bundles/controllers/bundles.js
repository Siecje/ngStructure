var app = angular.module("bundles.bundles", ['common.NameGetter']);

app.controller('Bundles', ['$scope', '$modal', 'NameGetter', 'bundles', function($scope, $modal, NameGetter, bundles){
  $scope.bundles = bundles.data.bundles;
  $scope.getNames = NameGetter.getNames;

  $scope.currentBundle = null;
  $scope.setBundle = function(item){
    $scope.currentBundle = item;
  }

  $scope.isEmpty = function(){
    return $scope.currentBundle === null;
  }

  $scope.selectModule = function(module){
    var moduleModalInstance = $modal.open({
      templateUrl: '/app/Bundles/templates/moduleModal.html',
      controller: 'ModuleModal',
      resolve: {
        module: function(){
          return module;
        }
      }
    });
  };

  $scope.deleteBundleModal = function(size){
    var deleteBundleModalInstance = $modal.open({
      templateUrl: '/app/Bundles/templates/deleteBundleModal.html',
      controller: 'DeleteBundleModal',
      size: size,
      resolve: {
        bundle: function(){
          return $scope.currentBundle;
        }
      }
    });

    deleteBundleModalInstance.result.then(function(result){
      // If $scope.currentModule was delete
      if (result){
        // Remove $scope.currentBundle from $scope.bundles
        $scope.bundles.splice($scope.bundles.indexOf($scope.currentBundle), 1);
        $scope.currentBundle = null;
      }
    });
  }

  $scope.tempBundles = [];
  $scope.showBundlesWithoutModules = function(){
    $scope.tempBundles = $scope.bundles;
    var temp2 = [];
    for (var i=0;i<$scope.bundles.length;i++){
      if ($scope.bundles[i].modules.length === 0){
        temp2.push($scope.bundles[i]);
      }
    }
    $scope.bundles = temp2;
  }

  $scope.resetBundles = function(){
    $scope.bundles = $scope.tempBundles;
  }
}]);
