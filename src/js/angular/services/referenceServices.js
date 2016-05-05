angular.module('portal')
.factory('Reference', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _reference = $resource(BaseUrl + 'references/:referenceAction/', {}, {
        all: {method: 'GET', params: {referenceAction: 'list'}, isArray: true},
        detail: {method: 'GET'},
        create: {method: 'POST', params: {referenceAction: 'new'}},
        update: {method: 'PATCH'},
        remove: {method: 'DELETE'}
      });

  services.all = function (success) {
    return _reference.all({}, success);
  };

  services.get = function (referenceID) {
    return _reference.detail({referenceAction: referenceID});
  };

  services.create = function (data, success, failure) {
    return _reference.create({}, data, success, failure);
  };

  services.update = function (data, success, failure) {
    return _reference.update({referenceAction: data.id }, data, success, failure);
  };

  services.remove = function (refID, success) {
    return _reference.remove({referenceAction: refID}, success);
  };
  
  return services;
}]);
