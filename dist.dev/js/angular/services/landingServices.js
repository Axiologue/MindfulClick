angular.module('portal')
.factory('Landing', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {
  var services = {};

  var _landing = $resource(BaseUrl + '/landing/recent/', {}, {
    query: {method: 'GET', isArray: true}
  });

  services.recentData = function (success) {
    return _landing.query(success);
  };

  return services;
}]);
