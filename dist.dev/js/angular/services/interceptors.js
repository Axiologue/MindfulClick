angular.module('portal')
.factory('tokenCleaner', ['$location', '$injector', '$cookies', function ($location, $injector, $cookies) {
  var interceptor = {
     responseError: function(response) {
      if (response.status === 401 && response.data) {
        if (response.data.detail === 'Invalid token.') {
          $cookies.remove('token');
          $cookies.remove('user')

          var http = $injector.get('$http');
          delete http.defaults.headers.common.Authorization;

          $location.path('/');
        }
      }
    }
  }

  return interceptor;
}]);
