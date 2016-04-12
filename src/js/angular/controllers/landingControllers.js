angular.module('portal')
.controller('RecentCtrl', ['$scope', 'Landing', function ($scope, Landing) {
  var populateRecent = function (response) {
    $scope.events = response[2].events;
    $scope.tags = response[1].tags;
    $scope.posts = response[0].posts;

    for (var i=0; i<$scope.tags.length; i++) {
      $scope.tags[i].link = $scope.tags[i].product ? '#/products/detail/' + $scope.tags[i].product.id : '#/companies/detail/' + $scope.tags[i].company.id
    }
  };

  Landing.recentData(populateRecent);
}]);
