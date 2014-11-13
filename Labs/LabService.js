var app = angular.module("labs.LabService", []);

app.factory('LabService', ['$location', 'Objects', function($location, Objects){

  var _data = {
    id: null,
    name: '',
    location: '',
    description: '',
    objectives: '',
    numPages: null,
    duration: null,

    pictures: [],
    deliveryMethods: [],
    changes: false,
  };

  function _reset(){
    _data.id = null,
    _data.name = '';

    _data.location = '';
    _data.description = '';
    _data.objectives = '';
    _data.numPages = null;
    _data.duration = null;

    _data.pictures.length = 0;
    _data.deliveryMethods.length = 0;

    _data.changes = false;
  }

  function _setData(data){
    _data.id = data.id;
    _data.name = data.name;
    _data.location = data.location;
    _data.description = data.description;
    _data.objectives = data.objectives;
    _data.numPages = data.num_pages;
    _data.duration = data.duration;
    _data.pictures = data.pictures;
    _data.deliveryMethods = data.delivery_methods;
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

  function _addPicture(item, model, label){
    _addItemToField('pictures', item);
  }

  function _resetPictures(){
    _data.pictures.length = 0;
    _data.changes = true;
  }

  function _addDeliveryMethod(item, model, label){
    _addItemToField('deliveryMethods', item);
  }

  function _resetDeliveryMethods(){
    _data.deliveryMethods.length = 0;
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

  function _createLab(){
    // Clear cached Labs
    Objects.clearLabs();

    _data.changes = false;
    var pictureIds = _getIds(_data.pictures);
    var deliveryMethodIds = _getIds(_data.deliveryMethods);

    return Objects.createLab({
      name: _data.name,
      location: _data.location,
      description: _data.description,
      objectives: _data.objectives,
      num_pages: _data.numPages,
      duration: _data.duration,
      pictures: pictureIds,
      delivery_methods: deliveryMethodIds,
    }).success(function(result){
      $location.path('/labs/' + result.id);
    });
  }

  function _updateLab(){
    // Clear cached Labs
    Objects.clearLabs();

    _data.changes = false;
    var pictureIds = _getIds(_data.pictures);
    var deliveryMethodIds = _getIds(_data.deliveryMethods);

    return Objects.updateLab(_data.id, {
      name: _data.name,
      location: _data.location,
      description: _data.description,
      objectives: _data.objectives,
      num_pages: _data.numPages,
      duration: _data.duration,
      pictures: pictureIds,
      delivery_methods: deliveryMethodIds,
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

  return {
    reset: _reset,
    data: _data,
    addPicture: _addPicture,
    resetPictures: _resetPictures,
    addDeliveryMethod: _addDeliveryMethod,
    resetDeliveryMethods: _resetDeliveryMethods,
    createLab: _createLab,
    updateLab: _updateLab,
    setData: _setData,
  }
}]);
