angular.module('portal')
.factory('Product', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {

  var services = {},
      _productInfo = $resource(BaseUrl + 'products/products/:productID/', {}, {
        list: { method: 'GET', params: {productID: 'list'}},
        detail: { method: 'GET'}
      }),
      _productScores = $resource(BaseUrl + 'profile/scores/product/', {}, {
        get: { method: 'GET', isArray: true}
      }),
      _tags = $resource(BaseUrl + 'tags/etags/list/', {},{
        all: {method: 'GET', isArray: true}
      }),
      _divisions = ['Boys', 'Girls', 'Infant', 'Kids', 'Men', 'Newborn', 'Preschool', 'Toddler', 'Unisex', 'Women'],
      _categories = ['Baseball','Basketball','Crosstraining','Football','Hiking','Golf','Indoor','Lacrosse','Rugby','Running','Skate','Snowboarding','Soccer','Softball','Tennis','Track & Field','Trail Running','Trainers','Walking','Wrestling','Yoga'];
  

  services.detail = function (productID, success) {
    return _productInfo.detail({productID: productID}, success);
  };

  services.getScores = function (productID, success) {
    return _productScores.get({id: productID, include_object: false}, success);
  };

  services.getDivisions = function () {
    return _divisions;
  };

  services.getCategories = function () {
    return _categories;
  };

  services.allTags = function (productID, success) {
    return _tags.all({product_id: productID}, success);
  };

  services.list = function (queryDict, success) {
    var tempProduct = $.extend({}, queryDict);
    // remove empty keys
    for (var key in tempProduct) {
      if (tempProduct.hasOwnProperty(key)) {
        if (!tempProduct[key]) {
          delete tempProduct[key];
        }
      }
    }

    return _productInfo.list(tempProduct, success);

  };

  return services;

}]);
