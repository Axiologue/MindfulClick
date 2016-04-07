'use strict';

var portal = angular.module('portal', [
    'ngResource'
]);

portal.config(['$resourceProvider',function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

