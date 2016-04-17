angular.module('portal')
.factory('Company', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {

  var services = {},
      _companyInfo = $resource(BaseUrl + 'products/companies/:companyID/', {}, {
        all: { method: 'GET', params: {companyID: 'all'}, isArray: true},
        detail: { method: 'GET'}
      }),
      _companyScores = $resource(BaseUrl + 'profile/scores/company/', {}, {
        get: { method: 'GET', isArray: true}
      }),
      _tags = $resource(BaseUrl + 'tags/etags/list/', {},{
        all: {method: 'GET', isArray: true}
      });

  services.detail = function (companyID) {
    return _companyInfo.detail({companyID: companyID});
  };

  services.getScores = function (name, success) {
    return _companyScores.get({name: name, include_object: false}, success);
  };

  services.allTags = function (name) {
    return _tags.all({company: name});
  };

  return services;

}]);
