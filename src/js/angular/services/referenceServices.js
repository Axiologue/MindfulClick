angular.module('portal')
.factory('Reference', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _reference = $resource(BaseUrl + 'references/:referenceAction', {}, {
        all: {method: 'GET', params: {referenceAction: 'list'}, isArray: true},
        detail: {method: 'GET'}
      });

  services.all = function (success) {
    return _reference.all({}, success);
  };

  services.get = function (referenceID) {
    return _reference.detail({referenceAction: referenceID});
  }
  
  return services;
}]);
