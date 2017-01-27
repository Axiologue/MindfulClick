'use strict';

var portal = angular.module('portal', [
    'ngResource',
    'ui.bootstrap',
    'ngAnimate',
    'ngRoute',
    'ngCookies',
    'hc.marked',
    'angucomplete-alt'
]);

// Resource settings
portal.config(['$resourceProvider', '$locationProvider', '$httpProvider', function($resourceProvider, $locationProvider, $httpProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('tokenCleaner');
}]);

// api settings
portal.config(['$httpProvider', function ($httpProvider) {
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
      .when('/forbidden', {
        templateUrl: 'templates/auth/forbidden.html',
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
      .when('/companies/detail/:companyName', {
        controller: 'CompanyDetailCtrl',
        templateUrl: 'templates/company_detail.html',
      })
      .when('/companies/all', {
        controller: 'CompanyAllCtrl',
        templateUrl: 'templates/company_all.html',
      })
      .when('/products/search', {
        controller: 'ProductSearchCtrl',
        templateUrl: 'templates/product_search.html',
      })
      .when('/products/detail/:productID', {
        controller: 'ProductDetailCtrl',
        templateUrl: 'templates/product_detail.html',
      })
      .when('/search/general', {
        controller: 'GeneralSearchCtrl',
        templateUrl: 'templates/search_empty.html'
      })
      .when('/search/general/:searchQuery', {
        controller: 'GeneralSearchCtrl',
        templateUrl: 'templates/search_results.html'
      })
      .when('/references/all', {
        controller: 'AllReferenceCtrl',
        templateUrl: 'templates/reference_list.html'
      })
      .when('/references/how-to', {
        templateUrl: 'templates/how_to.html'
      })
      .when('/references/new', {
        controller: 'NewReferenceCtrl',
        templateUrl: 'templates/reference_new.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/references/deleted', {
        templateUrl: 'templates/reference_deleted.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/references/detail/:referenceID', {
        controller: 'ReferenceDetailCtrl',
        templateUrl: 'templates/reference_detail.html'
      })
      .when('/tags/all', {
        controller: 'TagListCtrl',
        templateUrl: 'templates/tag_list.html'
      })
      .when('/forum/main', {
        templateUrl: 'templates/forum_main.html',
        controller: 'ForumMainCtrl'
      })
      .when('/forum/category/:categoryID', {
        templateUrl: 'templates/forum_thread_list.html',
        controller: 'ThreadListCtrl'
      })
      .when('/forum/thread/:threadID', {
        templateUrl: 'templates/forum_post_list.html',
        controller: 'PostListCtrl'
      })
      .when('/account', {
        templateUrl: 'templates/auth/userprofile.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/profile', {
        controller: 'ProfileCtrl',
        templateUrl: 'templates/ethics_profile.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/profile/questions', {
        controller: 'QuestionListCtrl',
        templateUrl: 'templates/question_list.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/profile/questions/:questionID', {
        controller: 'QuestionDetailCtrl',
        templateUrl: 'templates/question_detail.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/initial', {
        controller: 'InitialCtrl',
        templateUrl: 'templates/initial_questions.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/thanks', {
        templateUrl: 'templates/thanks.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/404', {
        templateUrl: 'templates/404.html'
      })
      .otherwise({
          redirectTo: '/404'
      });

}]);
