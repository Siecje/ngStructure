var app = angular.module("bundles.BundleService", []);

/* 
  Hold a single Bundle object that will be set on page load and modified in 
  CreateBundle and EditBundle controllers
*/
app.factory('BundleService', ['$location', 'Objects', function($location, Objects){

  var _data = {
    id: null,
    name: '',
    products: [],
    deliveryMethods: [],
    modules: [],
    changes: false,
  };

  function _resetBundle(){
    _data.id = null,
    _data.name = '';
    _data.products.length = 0;
    _data.deliveryMethods.length = 0;
    _data.modules.length = 0;
    _data.changes = false;
  }

  function _setData(data){
    _data.id = data.id;
    _data.name = data.name;
    _data.products = data.products;
    _data.deliveryMethods = data.delivery_methods;
    _data.modules = data.modules;
  }

  function _addProduct(item, model, label){
    var include = true;
    angular.forEach(_data.products, function(product){
      if (product.id === item.id){
        include = false;
      }
    });
    if (include){
      _data.products.push(item);
      _data.changes = true;
    }
  }
  
  function _resetProducts(){
    _data.products.length = 0;
    _data.changes = true;
  }

  function _addDeliveryMethod(item, model, label){
    var include = true;
    angular.forEach(_data.deliveryMethods, function(deliveryMethod){
      if (deliveryMethod.id === item.id){
        include = false;
      }
    });
    if (include){
      _data.deliveryMethods.push(item);
      _data.changes = true;
    }
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

  function _createBundle(){
    // Clear cached Bundles
    Objects.clearBundles();
    
    _data.changes = false;
    var productIDs = _getIds(_data.products);
    var deliveryMethodIDs = _getIds(_data.deliveryMethods);

    return Objects.createBundle({
      name: _data.name,
      products: productIDs,
      delivery_methods: deliveryMethodIDs}
    ).success(function(result){
      $location.path('/bundles/' + result.id);
    });
  }

  function _updateBundle(){
    // Clear cached Bundles
    Objects.clearBundles();

    _data.changes = false;
    var productIds = _getIds(_data.products);
    var deliveryMethodIds = _getIds(_data.deliveryMethods);
    var moduleIds = _getIds(_data.modules);
    return Objects.updateBundle(_data.id, {
      name: _data.name,
      modules: moduleIds,
      products: productIds,
      delivery_methods: deliveryMethodIds}
    );
  }

  function _moduleInBundle(module){
    for(var i=0;i<_data.modules.length;i++){
      if (_data.modules[i].id === module.id){
        return true;
      }
    }
    return false;
  }

  function _addModuleToBundle(module){
    _data.modules.push(module);
    _data.changes = true;
  }

  function _removeModuleFromBundle(module){
    _data.modules.splice(_data.modules.indexOf(module), 1);
    _data.changes = true;
  }

  return {
    resetBundle: _resetBundle,
    data: _data,
    addProduct: _addProduct,
    resetProducts: _resetProducts,
    addDeliveryMethod: _addDeliveryMethod,
    resetDeliveryMethods: _resetDeliveryMethods,
    createBundle: _createBundle,
    updateBundle: _updateBundle,
    moduleInBundle: _moduleInBundle,
    addModuleToBundle: _addModuleToBundle,
    removeModuleFromBundle: _removeModuleFromBundle,
    setData: _setData,
  }
}]);
