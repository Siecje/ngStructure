var app = angular.module("labs.labs", ['common.NameGetter']);

app.controller('Labs', ['$scope', '$modal', 'NameGetter', 'labs', function($scope, $modal, NameGetter, labs){
  $scope.labs = labs.data.labs;
  $scope.getNames = NameGetter.getNames;

  $scope.currentLab = null;
  $scope.setLab = function(item){
    $scope.currentLab = item;
  }

  $scope.isEmpty = function(){
    return $scope.currentLab === null;
  }

  $scope.deleteLabModal = function(size){
    var deleteLabModalInstance = $modal.open({
      templateUrl: '/app/Labs/templates/deleteLabModal.html',
      controller: 'DeleteLabModal',
      size: size,
      resolve: {
        lab: function(){
          return $scope.currentLab;
        }
      }
    });

    deleteLabModalInstance.result.then(function(result){
      // If $scope.currentLab was deleted
      if (result){
        // Remove $scope.currentLab from $scope.labs
        $scope.labs.splice($scope.labs.indexOf($scope.currentLab), 1);
        $scope.currentLab = null;
      }
    });
  }

}]);
