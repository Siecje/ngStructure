var app = angular.module("modules.editModule", ['common.NameGetter', 'modules.ModuleService']);

// These controllers all define the same variables and functions for their respective object
app.controller('moduleBundles', ['$scope', 'ModuleService', function($scope, ModuleService){

  $scope.objectsName = 'Bundles';
  $scope.moduleObjects = ModuleService.data.bundles;

  $scope.current = {};
  $scope.setCurrent = function(bundle){
    $scope.current = bundle;
  }

  $scope.isCurrent = function(bundle){
    if ($scope.current){
      return $scope.current.id === bundle.id;
    }
    return false;
  }

  $scope.alreadyInModule = ModuleService.bundleInModule;
  $scope.addToModule = function(bundle){
    ModuleService.addBundle(bundle);
    $scope.current = {};
  }
  $scope.removeFromModule = ModuleService.removeBundleFromModule;
}]);


app.controller('moduleLabs', ['$scope', 'ModuleService', function($scope, ModuleService){

  $scope.objectsName = 'Labs';
  $scope.moduleObjects = ModuleService.data.labs;

  $scope.current = {};
  $scope.setCurrent = function(lab){
    $scope.current = lab;
  }

  $scope.isCurrent = function(lab){
    if ($scope.current){
      return $scope.current.id === lab.id;
    }
  }

  $scope.alreadyInModule = ModuleService.labInModule;
  $scope.addToModule = function(lab){
    ModuleService.addLab(lab);
    $scope.current = {};
  }
  $scope.removeFromModule = ModuleService.removeLabFromModule;
}]);

app.controller('moduleLectures', ['$scope', 'ModuleService', function($scope, ModuleService){

  $scope.objectsName = 'Lectures';
  $scope.moduleObjects = ModuleService.data.lectures;

  $scope.current = {};
  $scope.setCurrent = function(lecture){
    $scope.current = lecture;
  }

  $scope.isCurrent = function(lecture){
    if ($scope.current){
      return $scope.current.id === lecture.id;
    }
  }

  $scope.alreadyInModule = ModuleService.lectureInModule;
  $scope.addToModule = function(lecture){
    ModuleService.addLecture(lecture);
    $scope.current = {};
  }
  $scope.removeFromModule = ModuleService.removeLectureFromModule;
}]);

app.controller('moduleVideos', ['$scope', 'ModuleService', function($scope, ModuleService){
  $scope.objectsName = 'Videos';
  $scope.moduleObjects = ModuleService.data.videos;

  $scope.current = {};
  $scope.setCurrent = function(video){
    $scope.current = video;
  }

  $scope.isCurrent = function(video){
    if ($scope.current){
      return $scope.current.id === video.id;
    }
  }

  $scope.alreadyInModule = ModuleService.videoInModule;
  $scope.addToModule = function(video){
    ModuleService.addVideo(video);
    $scope.current = {};
  }
  $scope.removeFromModule = ModuleService.removeVideoFromModule;
}]);

app.controller('editModule', ['$scope', 'growl', 'NameGetter', 'ModuleService', 'module', 'products', 'actors', 'bundles', 'labs', 'lectures', 'videos',
    function($scope, growl, NameGetter, ModuleService, module, products, actors, bundles, labs, lectures, videos){
  $scope.getNames = NameGetter.getNames;

  $scope.products = products.data.products;
  $scope.actors = actors.data.actors;

  $scope.bundles = bundles.data.bundles;
  $scope.labs = labs.data.labs;
  $scope.lectures = lectures.data.lectures;
  $scope.videos = videos.data.videos;

  ModuleService.reset();
  ModuleService.setData(module.data);
  $scope.module = ModuleService.data;

  $scope.addProduct = ModuleService.addProduct;
  $scope.resetProducts = ModuleService.resetProducts;

  $scope.addActor = ModuleService.addActor;
  $scope.resetActors = ModuleService.resetActors;

  $scope.updateModule = function(){
    ModuleService.updateModule().error(function(result){
      growl.addErrorMessage(result.message);
    });
  };

}]);
