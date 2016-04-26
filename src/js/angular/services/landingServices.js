angular.module('portal')
.factory('Landing', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {
  var services = {};

  var _landing = $resource(BaseUrl + 'landing/recent/', {}, {
    query: {method: 'GET', isArray: true}
  });

  services.recentData = function (success) {
    return _landing.query(success);
  };

  return services;
}]);


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
