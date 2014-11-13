var app = angular.module("app", ['ui', 'angular-growl', 'ui.bootstrap', 'ui.router', 'ngAnimate',
'truncate', 'common.CommonModule', 'module.auth',
'module.main', 'module.users', 'module.bundles',
'module.modules', 'module.labs'
]);

HOST = 'http://localhost:5000';

/* Required for CORS (Cross Origin Resource Sharing) (In order for this code to make requests to another domain) */
app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
}]);

app.config(['growlProvider', function(growlProvider){
  /* Notifications will be closed after 5 seconds automatically */
  growlProvider.globalTimeToLive(5000);
}]);

/* Will automatically display notifications in the "messages" field of any response */
//app.config(['growlProvider', '$httpProvider', function(growlProvider, $httpProvider) {
//    $httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);
//}]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise('/');
}]);

app.factory('AuthRequests', ['$http', function($http){
  return {
    getToken: function(){
      return $http.get(HOST + '/api/v1.0/token');
    },
    authenticate: function(){
      return $http.get(HOST + '/api/v1.0/authenticate');
    },
  }
}]);

app.factory('Objects', ['$http', '$cacheFactory', function($http, $cacheFactory){

  return {
    getLabs: function(){
      return $http.get(HOST + '/api/v1.0/labs/', {cache: true});
    },
    getLab: function(labId){
      return $http.get(HOST + '/api/v1.0/labs/' + labId, {cache: true});
    },
    createLab: function(data){
      return $http.post(HOST + '/api/v1.0/labs/', data=data);
    },
    updateLab: function(labId, data){
      return $http.post(HOST + '/api/v1.0/labs/' + labId, data=data);
    },
    deleteLab: function(labId){
      return $http.delete(HOST + '/api/v1.0/labs/' + labId);
    },
    clearLabs: function(){
      var cache = $cacheFactory.get('$http');
      cache.remove(HOST + '/api/v1.0/labs/');
    },
    getLectures: function(){
      return $http.get(HOST + '/api/v1.0/lectures/', {cache: true});
    },
    getVideos: function() {
      return $http.get(HOST + '/api/v1.0/videos/', {cache: true});
    },
    getModules: function() {
      return $http.get(HOST + '/api/v1.0/modules/', {cache: true});
    },
    getModule: function(moduleId){
      return $http.get(HOST + '/api/v1.0/modules/' + moduleId, {cache: true});
    },
    createModule: function(data){
      return $http.post(HOST + '/api/v1.0/modules/', data=data);
    },
    updateModule: function(moduleId, data){
      return $http.post(HOST + '/api/v1.0/modules/' + moduleId, data=data);
    },
    deleteModule: function(moduleLocation){
      return $http.delete(HOST + '/api/v1.0/modules/', data={'location': moduleLocation});
    },
    clearModules: function(){
      var cache = $cacheFactory.get('$http');
      cache.remove(HOST + '/api/v1.0/modules/');
    },
    getBundles: function() {
      return $http.get(HOST + '/api/v1.0/bundles/', {cache: true});
    },
    getBundle: function(bundleId){
      return $http.get(HOST + '/api/v1.0/bundles/' + bundleId, {cache: true});
    },
    createBundle: function(data){
      return $http.post(HOST + '/api/v1.0/bundles/', data=data);
    },
    updateBundle: function(bundleId, data){
      return $http.post(HOST + '/api/v1.0/bundles/' + bundleId, data=data);
    },
    deleteBundle: function(bundleId){
      return $http.delete(HOST + '/api/v1.0/bundles/' + bundleId);
    },
    clearBundles: function(){
      var cache = $cacheFactory.get('$http');
      cache.remove(HOST + '/api/v1.0/bundles/');
    },
    getProducts: function(){
      return $http.get(HOST + '/api/v1.0/products/', {cache: true});
    },
    getTechnologies: function(){
      return $http.get(HOST + '/api/v1.0/technologies/', {cache: true});
    },
    getActors: function(){
      return $http.get(HOST + '/api/v1.0/actors/', {cache: true});
    },
    getIndustries: function(){
      return $http.get(HOST + '/api/v1.0/industries/', {cache: true});
    },
    getDeliveryCategories: function(){
      return $http.get(HOST + '/api/v1.0/delivery-categories/', {cache: true});
    },
    getUsers: function(){
      return $http.get(HOST + '/api/v1.0/users/', {cache: true});
    },
    getUser: function(userId){
      return $http.get(HOST + '/api/v1.0/users/' + userId, {cache: true});
    },
    updateUser: function(userId, data){
      return $http.post(HOST + '/api/v1.0/users/' + userId, data=data);
    },
    clearUsers: function(){
      var cache = $cacheFactory.get('$http');
      cache.remove(HOST + '/api/v1.0/users/');
    },
    getRoles: function(){
      return $http.get(HOST + '/api/v1.0/roles/', {cache: true});
    },
    getCompanies: function(){
      return $http.get(HOST + '/api/v1.0/companies/', {cache: true});
    },
    getCompany: function(companyId){
      return $http.get(HOST + '/api/v1.0/companies/' + companyId, {cache: true});
    },
    updateCompany: function(company){
      return $http.put(HOST + '/api/v1.0/companies/' + company.id, data=company);
    },
    clearCompanies: function(){
      var cache = $cacheFactory.get('$http');
      cache.remove(HOST + '/api/v1.0/companies/');
    },
  };
}]);
