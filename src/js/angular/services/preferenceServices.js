angular.module('portal')
.factory('Preference', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {
  var services = {},
      _pref = $resource(BaseUrl + 'profile/prefs/:preferenceID/', {}, {
        all: {method: 'GET', params: {preferenceID: 'all'}, isArray: true},
        update: {method: 'PUT'}
      });

    services.getAll = function () {
      return _pref.all();
    };

    services.update = function (data, success) {
      return _pref.update({preferenceID: data.id}, data, success);
    };

    return services;

}]);
