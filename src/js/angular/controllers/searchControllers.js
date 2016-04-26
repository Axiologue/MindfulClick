angular.module('portal')
.controller('GeneralSearchFormCtrl', ['$scope', '$location', function ($scope, $location) {

  $scope.generalSearch = function () {
    if ($scope.search.query) {
      $location.path('search/general/' + $scope.search.query);
    }
  };
}]);

angular.module('portal')
.controller('GeneralSearchCtrl', ['$scope', 'Includes', function ($scope, Includes) {
  $scope.generalSearchForm = Includes.get('generalSearchForm');
}]);

angular.module('portal')
.controller('SearchResultsCtrl', ['$scope', 'Search', '$routeParams', '$location', '$anchorScroll', function ($scope, Search, $routeParams, $location, $anchorScroll) {
  $scope.search = { query: $routeParams.searchQuery };
  $scope.state = { loading: true };

  var searchSuccess = function (response) {
    $scope.state.loading = false;
    
    delete response.$promise;
    delete response.$resolved;

    $scope.results = response;
    $scope.result_keys = Object.keys(response);
    $scope.results.products = $scope.results.products.map(function (obj) {
      return { id: obj.id, text: obj.text.split('\n') };
    });
    $scope.results.references = $scope.results.references.map(function (obj) {
      return { id: obj.id, text: obj.text.split('\n') };
    });
  };

  Search.general($routeParams.searchQuery, searchSuccess);

  $scope.goToHash = function (hash) {

    $anchorScroll(hash);
  };
}]);
