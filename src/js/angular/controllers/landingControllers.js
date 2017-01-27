angular.module('portal')
.controller('RecentCtrl', ['$scope', 'Tag', function ($scope, Tag) {
  $scope.search = { query: '' };

  var recentSuccess = function (response) {
    for (var i=0; i < response.length; i++) {
      response[i].link = response[i].product ? '/products/detail/' + response[i].product.id : '/companies/detail/' + response[i].company.replace(' ', '-');
    }

    $scope.left_tags = response.slice(0, 5);
    $scope.right_tags = response.slice(5, 10);
  };

  var recentFailure = function (response) {
    console.log(response.data);
  };

  Tag.recent(recentSuccess, recentFailure);
}]);


