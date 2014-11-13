var app = angular.module("modules.VideoModal", []);

app.controller('VideoModal', ['$scope', '$modalInstance', 'NameGetter', 'video',
    function($scope, $modalInstance, NameGetter, video){
  $scope.video = video.data;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
