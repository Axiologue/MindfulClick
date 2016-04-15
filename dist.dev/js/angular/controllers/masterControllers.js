angular.module('portal')
.controller('MasterCtrl', ['$scope', 'djangoAuth', '$cookies', function ($scope, djangoAuth) {
  var expires = {};

  // Assume user is not logged in until we hear otherwise
  $scope.authenticated = false;
  // Wait for the status of authentication, set scope var to true if it resolves
  $scope.user = {'username':'','first_name':'','last_name':'','email':''};


// Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function(){
        $scope.authenticated = true;
        djangoAuth.profile();
    });

    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      $scope.authenticated = false;
      $scope.user = {'username':'','first_name':'','last_name':'','email':''};
    });

    // Wait and respond to the log in event.
    $scope.$on('djangoAuth.logged_in', function() {
      $scope.authenticated = true;
      djangoAuth.profile();
    });

    $scope.$on('djangoAuth.set_profile', function (event, data) {
        $scope.user = data;
    });

    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection);
      $location.path('/login').replace();
    });

    $scope.logout = function(){
      djangoAuth.logout();
    };
}]);
