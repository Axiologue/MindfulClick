angular.module('portal')
.factory('Tag', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _tags = $resource(BaseUrl + 'tags/etags/list/', {}, {
        all: {method: 'GET', isArray: true}
      });

  services.all = function () {
    return _tags.all();
  };

  return services;
}]);
