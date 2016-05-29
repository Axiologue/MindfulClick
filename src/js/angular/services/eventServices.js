angular.module('portal')
.factory('Event', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _event = $resource(BaseUrl + 'events/:eventID',{}, {
        all: {method: 'GET', params: {eventID: 'all'}, isArray: true},
        detail: {method: 'GET'}
      });

  services.all = function (success) {
    return _event.all({}, success);
  };

  services.detail = function (eventID, success) {
    return _event.detail({eventID: eventID}, success);
  };

  return services;
}]);
