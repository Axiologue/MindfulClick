// For getting company and ethics lists, used in form-making
angular.module('portal')
.factory('Meta',['$resource', 'BaseUrl',
  function ($resource, BaseUrl) {
    return $resource(BaseUrl + 'tags/formMeta/',{},{
      query: {method:'GET',params:{},isArray:true}
    });
}]);
