'use strict';

var cross = angular.module('cross', [
  'crossServices',
  'ngRoute',
  'ngCookies',
  'ngSanitize',
  'ngResource',
  'rzModule',
  'angucomplete-alt'
]);

cross.config(['$resourceProvider',function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

cross.config(['$routeProvider',
  function($routeProvider) { 
    $routeProvider.
      when('/', {
        templateUrl: 'templates/landing.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            // MAKE TRUE FOR PRODUCTION
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/login', {
        templateUrl: 'templates/auth/login.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/userProfile', {
        templateUrl: 'templates/auth/userprofile.html',
        controller: 'ProfilePageCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            // MAKE TRUE FOR PRODUCTION
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/signUp', {
        templateUrl: 'templates/auth/signup.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            // MAKE TRUE FOR PRODUCTION
            return djangoAuth.authenticationStatus();
          }]
        }
      })
      .when('/verifyEmail/:emailVerificationToken', {
        templateUrl: 'templates/auth/verifyemail.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/passwordReset', {
        templateUrl: 'templates/auth/passwordreset.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/passwordResetConfirm/:firstToken/:passwordResetToken', {
        templateUrl: 'templates/auth/passwordresetconfirm.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/ethicsProfile', {
        templateUrl: 'templates/includes/ethicsprofile.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/company', {
        templateUrl: 'templates/includes/company_score.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/questions',{
        templateUrl: 'templates/questions.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus(true);
           }],
        }
      })
      .when('/question/:questionID', {
        templateUrl: 'templates/answers.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus(true);
           }],
        }
      })
      .when('/articles/tagged', {
        templateUrl: 'templates/articlesTagged.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/articles/untagged', {
        templateUrl: 'templates/articlesUntagged.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/articles/new', {
        templateUrl: 'templates/articlesNew.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/articles/irrelevant', {
        templateUrl: 'templates/articlesIrrelevant.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/text/scores', {
        templateUrl: 'templates/text-scores.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/text/research', {
        templateUrl: 'templates/text-research.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/text/tagging', {
        templateUrl: 'templates/text-tagging.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/products/new', {
        templateUrl: 'templates/products-new.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/products/detail/:productID', {
        templateUrl: 'templates/products-detail.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .when('/products/search', {
        templateUrl: 'templates/products-search.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth) {
            return djangoAuth.authenticationStatus();
           }],
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
