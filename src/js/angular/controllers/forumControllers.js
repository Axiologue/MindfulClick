angular.module('portal')
.controller('ForumMainCtrl', ['Forum', '$scope', function (Forum, $scope) {
  $scope.categories = Forum.allCategories();
}]);

angular.module('portal')
.controller('ThreadListCtrl', ['Forum', '$scope', '$routeParams', function (Forum, $scope, $routeParams) {
  $scope.category = Forum.categoryDetail($routeParams.categoryID);
  $scope.threads = Forum.threadsByCategory($routeParams.categoryID);

  $scope.showNewThreadForm = false;

  $scope.showThreadForm = function () {
    $scope.newThread = {
      subject: '',
      category: $scope.category.id
    };

    $scope.showNewThreadForm = true;
  };

  $scope.cancelNewThread = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.showNewThreadForm = false;
  }

  $scope.submitThread = function () {
    var success = function (response) {
      var now = new Date();
      response.created_date = now.toLocaleString();
      response.author = $scope.user.username;
      response.post_count = 0;
      $scope.threads = [response].concat($scope.threads);
      $scope.showNewThreadForm = false;
    };

    var failure = function (response) {
      console.log(response);
    };

    Forum.newThread($scope.newThread, success, failure);
  };
}]);
