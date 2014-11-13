var app = angular.module("modules.ModuleService", []);

app.factory('ModuleService', ['$location', 'Objects', function($location, Objects){

  var _data = {
    id: null,
    name: '',
    location: '',
    description: '',
    trainingLevel: null,
    objectives: '',

    labs: [],
    lectures: [],
    videos: [],

    bundles: [],
    deliveryMethods: [],
    companies: [],
    products: [],
    actors: [],
    changes: false,
  };

  function _reset(){
    _data.id = null,
    _data.name = '';

    _data.location = '';
    _data.description = '';
    _data.trainingLevel = null;
    _data.objectives = '';

    _data.labs.length = 0;
    _data.lectures.length = 0;
    _data.videos.length = 0;

    _data.bundles.length = 0;
    _data.deliveryMethods.length = 0;
    _data.companies.length = 0;
    _data.products.length = 0;
    _data.actors.length = 0;

    _data.changes = false;
  }

  function _setData(data){
    _data.id = data.id;
    _data.name = data.name;
    _data.location = data.location;
    _data.description = data.description;
    _data.trainingLevel = data.trainingLevel;
    _data.objectives = data.objectives;
    _data.labs = data.labs;
    _data.lectures = data.lectures;
    _data.videos = data.videos;
    _data.bundles = data.bundles;
    _data.deliveryMethods = data.delivery_methods;
    _data.companies = data.companies;
    _data.actors = data.actors;
    _data.products = data.products;
    _data.changes = false;
  }

  function _addItemToField(field, toAdd){
    var include = true;
    angular.forEach(_data[field], function(item){
      if (item.id === toAdd.id){
        include = false;
      }
    });
    if (include){
      _data[field].push(toAdd);
      _data.changes = true;
    }
  }

  function _addProduct(item, model, label){
    _addItemToField('products', item);
  }
  
  function _resetProducts(){
    _data.products.length = 0;
    _data.changes = true;
  }
  
  function _addLab(item, model, label){
    _addItemToField('labs', item);
  }
  
  function _resetLabs(){
    _data.labs.length = 0;
    _data.changes = true;
  }

  function _addLecture(item, model, label){
    _addItemToField('lectures', item);
  }
  
  function _resetLectures(){
    _data.lectures.length = 0;
    _data.changes = true;
  }

  function _addVideo(item, model, label){
    _addItemToField('videos', item);
  }
  
  function _resetVideos(){
    _data.videos.length = 0;
    _data.changes = true;
  }

  function _addBundle(item, model, label){
    _addItemToField('bundles', item);
  }
  
  function _resetBundles(){
    _data.bundles.length = 0;
    _data.changes = true;
  }

  function _addActor(item, model, label){
    _addItemToField('actors', item);
  }
  
  function _resetActors(){
    _data.actors.length = 0;
    _data.changes = true;
  }

  function _getIds(itemList){
    var idList = [];
    for (var i=0;i<itemList.length;i++){
      if(itemList[i].id){
        idList.push(itemList[i].id);
      }
    }
    return idList;
  }

  function _createModule(){
    // Clear cached Modules
    Objects.clearModules();
    
    _data.changes = false;
    var labIds = _getIds(_data.labs);
    var lectureIds = _getIds(_data.lectures);
    var videoIds = _getIds(_data.videos);

    var productIds = _getIds(_data.products);
    var actorIds = _getIds(_data.actors);
    var bundleIds = _getIds(_data.bundles);

    return Objects.createModule({
      name: _data.name,
      location: _data.location,
      labs: labIds,
      lectures: lectureIds,
      videos: videoIds,
      actors: actorIds,
      products: productIds,
      bundles: bundleIds,
    }).success(function(result){
      $location.path('/modules/' + result.id);
    });
  }

  function _updateModule(){
    // Clear cached Modules
    Objects.clearModules();

    _data.changes = false;
    var labIds = _getIds(_data.labs);
    var lectureIds = _getIds(_data.lectures);
    var videoIds = _getIds(_data.videos);

    var productIds = _getIds(_data.products);
    var actorIds = _getIds(_data.actors);
    var bundleIds = _getIds(_data.bundles);

    return Objects.updateModule(_data.id, {
      name: _data.name,
      location: _data.location,
      labs: labIds,
      lectures: lectureIds,
      videos: videoIds,
      actors: actorIds,
      products: productIds,
      bundles: bundleIds,
    });
  }

  function _bundleInModule(bundle){
    for(var i=0;i<_data.bundles.length;i++){
      if (_data.bundles[i].id === bundle.id){
        return true;
      }
    }
    return false;
  }

  function _removeBundleFromModule(bundle){
    _data.bundles.splice(_data.bundles.indexOf(bundle), 1);
    _data.changes = true;
  }

  function _labInModule(lab){
    for(var i=0;i<_data.labs.length;i++){
      if (_data.labs[i].id === lab.id){
        return true;
      }
    }
    return false;
  }

  function _removeLabFromModule(lab){
    _data.labs.splice(_data.labs.indexOf(lab), 1);
    _data.changes = true;
  }

  return {
    reset: _reset,
    data: _data,
    addLab: _addLab,
    resetLabs: _resetLabs,
    addLecture: _addLecture,
    resetLectures: _resetLectures,
    addVideo: _addVideo,
    resetVideos: _resetVideos,
    addBundle: _addBundle,
    resetBundles: _resetBundles,
    addActor: _addActor,
    resetActors: _resetActors,
    addProduct: _addProduct,
    resetProducts: _resetProducts,
    createModule: _createModule,
    updateModule: _updateModule,
    setData: _setData,
    bundleInModule: _bundleInModule,
    removeBundleFromModule: _removeBundleFromModule,
    labInModule: _labInModule,
    removeLabFromModule: _removeLabFromModule,
  }
}]);
