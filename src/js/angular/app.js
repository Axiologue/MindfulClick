'use strict';

var portal = angular.module('portal', [
    'ngResource',
    'ui.bootstrap',
    'ngAnimate',
    'ngRoute',
    'ngCookies'
]);

// Resource settings
portal.config(['$resourceProvider',function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

// api settings
portal.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('tokenCleaner');
}]);

portal.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/landing.html',
      })
      .when('/login', {
        templateUrl: 'templates/auth/login.html',
      })
      .when('/signUp', {
        templateUrl: 'templates/auth/signup.html',
      })
      .when('/verifyEmail/:emailVerificationToken', {
        templateUrl: 'templates/auth/verifyemail.html',
      })
      .when('/passwordReset', {
        templateUrl: 'templates/auth/passwordreset.html',
      })
      .when('/passwordResetConfirm/:firstToken/:passwordResetToken', {
        templateUrl: 'templates/auth/passwordresetconfirm.html',
      })
      .otherwise({
          redirectTo: '/'
      });

}]);
