angular.module('portal')
.factory('Tag', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _tags = $resource(BaseUrl + 'tags/etags/:tagID/', {}, {
        all: {method: 'GET', params: {tagID: 'list'}, isArray: true},
        saveMulti: {method: 'POST', params: {tagID: 'new'}, isArray: true}
      });

  services.all = function () {
    return _tags.all();
  };

  services.createTag = function (data, success, failure) {
    if (data.products.length <= 1) {
      return _tags.save({tagID: 'new'}, data, success, failure);
    } else {
      return _tags.saveMult({}, data, success, failure);
    }
  }

  return services;
}]);
