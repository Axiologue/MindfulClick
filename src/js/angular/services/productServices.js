angular.module('portal')
.factory('Product', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {

  var services = {},
      _productInfo = $resource(BaseUrl + 'products/products/:productID/', {}, {
        all: { method: 'GET', params: {companyID: 'all'}, isArray: true},
        detail: { method: 'GET'}
      }),
      _productScores = $resource(BaseUrl + 'profile/scores/product/', {}, {
        get: { method: 'GET', isArray: true}
      }),
      _tags = $resource(BaseUrl + 'tags/etags/list/', {},{
        all: {method: 'GET', isArray: true}
      });

  services.detail = function (productID, success) {
    return _productInfo.detail({productID: productID}, success);
  };

  services.getScores = function (productID, success) {
    return _productScores.get({id: productID, include_object: false}, success);
  };

  services.allTags = function (productID, success) {
    return _tags.all({product_id: productID}, success);
  };

  return services;

}]);
