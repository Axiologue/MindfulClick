'use strict';

var portal = angular.module('portal', [
    'ngResource',
    'ui.bootstrap',
    'ngAnimate',
    'ngRoute',
    'ngCookies',
    'hc.marked'
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
      .when('/companies/detail/:companyName', {
        controller: 'CompanyDetailCtrl',
        templateUrl: 'templates/company_detail.html',
      })
      .when('/products/detail/:productID', {
        controller: 'ProductDetailCtrl',
        templateUrl: 'templates/product_detail.html',
      })
      .when('/blog/all', {
        controller: 'BlogListCtrl',
        templateUrl: 'templates/blog_list.html'
      })
      .when('/blog/detail/:postName', {
        controller: 'BlogDetailCtrl',
        templateUrl: 'templates/blog_detail.html'
      })
      .otherwise({
          redirectTo: '/'
      });

}]);
