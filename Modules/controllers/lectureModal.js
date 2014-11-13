var app = angular.module("modules.LectureModal", []);

app.controller('LectureModal', ['$scope', '$modalInstance', 'NameGetter', 'lecture',
    function($scope, $modalInstance, NameGetter, lecture){
  $scope.lecture = lecture.data;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
