var app = angular.module("modules.modules", ['common.NameGetter']);

app.controller('Modules', ['$scope', '$modal', '$http', 'NameGetter', 'modules', function($scope, $modal, $http, NameGetter, modules){
  $scope.modules = modules.data.modules;
  $scope.getNames = NameGetter.getNames;

  $scope.currentModule = null;
  $scope.setModule = function(item){
    $scope.currentModule = item;
  }

  $scope.isEmpty = function(){
    return $scope.currentModule === null;
  }

  $scope.selectLab = function(lab){
    var moduleModalInstance = $modal.open({
      templateUrl: '/app/Modules/templates/labModal.html',
      controller: 'LabModal',
      resolve: {
        lab: function(){
          return $http.get(lab.url);
        }
      }
    });
  };

  $scope.selectLecture = function(lecture){
    var moduleModalInstance = $modal.open({
      templateUrl: '/app/Modules/templates/lectureModal.html',
      controller: 'LectureModal',
      resolve: {
        lecture: function(){
          return $http.get(lecture.url);
        }
      }
    });
  };

  $scope.selectVideo = function(video){
    var moduleModalInstance = $modal.open({
      templateUrl: '/app/Modules/templates/videoModal.html',
      controller: 'VideoModal',
      resolve: {
        video: function(){
          return $http.get(video.url);
        }
      }
    });
  };

  $scope.deleteModuleModal = function(size){
    var deleteModuleModalInstance = $modal.open({
      templateUrl: '/app/Modules/templates/deleteModuleModal.html',
      controller: 'DeleteModuleModal',
      size: size,
      resolve: {
        module: function(){
          return $scope.currentModule;
        }
      }
    });

    deleteModuleModalInstance.result.then(function(result){
      // If $scope.currentModule was delete
      if (result){
        // Remove $scope.currentModule from $scope.modules
        $scope.modules.splice($scope.modules.indexOf($scope.currentModule), 1);
        $scope.currentModule = null;
      }
    });
  }
}]);
