angular.module('portal')
.factory('Search', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {
  var services = {},
      _search = $resource(BaseUrl + 'search/general/', {}, {
        get: {method: 'GET'}
      });

  services.general = function (query, success) {
    return _search.get({q: query}, success);
  };

  return services;
}]);
