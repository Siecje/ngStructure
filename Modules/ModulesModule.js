var app = angular.module("module.modules", ['modules.ModuleService', 'modules.createModule', 'modules.editModule', 'modules.modules', 'modules.LabModal', 'modules.LectureModal', 'modules.VideoModal', 'modules.DeleteModuleModal']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $stateProvider.state('modules', {
    url: '^/modules',
    templateUrl: '/app/Modules/templates/modules.html',
    controller: 'Modules',
    resolve: {
      'modules': function(Objects){
        return Objects.getModules();
      }
    },
  });

  $stateProvider.state('createModule', {
    url: '^/modules/create',
    templateUrl: '/app/Modules/templates/createModule.html',
    controller: 'createModule',
    resolve: {
      'labs': function(Objects){
        return Objects.getLabs();
      },
      'lectures': function(Objects){
        return Objects.getLectures();
      },
      'videos': function(Objects){
        return Objects.getVideos();
      },
      'products': function(Objects){
        return Objects.getProducts();
      },
      'bundles': function(Objects){
        return Objects.getBundles();
      },
      'actors': function(Objects){
        return Objects.getActors();
      },
    },
  });

  $stateProvider.state('editModule', {
    url: '^/modules/:moduleId',
    templateUrl: '/app/Modules/templates/editModule.html',
    controller: 'editModule',
    resolve: {
      'module': function($stateParams, Objects){
        return Objects.getModule($stateParams.moduleId);
      },
      'products': function(Objects){
        return Objects.getProducts();
      },
      'actors': function(Objects){
        return Objects.getActors();
      },
      'bundles': function(Objects){
        return Objects.getBundles();
      },
      'labs': function(Objects){
        return Objects.getLabs();
      },
      'lectures': function(Objects){
        return Objects.getLectures();
      },
      'videos': function(Objects){
        return Objects.getVideos();
      }
    },
  });

}]);
