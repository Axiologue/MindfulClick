angular.module('portal')
.controller('ForumMainCtrl', ['Forum', '$scope', function (Forum, $scope) {
  $scope.categories = Forum.allCategories();
}]);

angular.module('portal')
.controller('ThreadListCtrl', ['Forum', '$scope', '$routeParams', function (Forum, $scope, $routeParams) {
  $scope.category = Forum.categoryDetail($routeParams.categoryID);

  $scope.showNewThreadForm = false;

  $scope.showThreadForm = function () {
    $scope.newThread = {
      subject: '',
      post_content: '',
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
      response.post_count = 1;
      $scope.category.threads = [response].concat($scope.category.threads);
      $scope.showNewThreadForm = false;
    };

    var failure = function (response) {
      console.log(response);
    };

    Forum.newThread($scope.newThread, success, failure);
  };
}]);

angular.module('portal')
.controller('PostListCtrl', ['$scope', 'Forum', '$routeParams', function ($scope, Forum, $routeParams) {
  $scope.thread = Forum.threadDetail($routeParams.threadID);

  $scope.showNewPostForm = false;

  $scope.showPostForm = function () {
    $scope.newPost = {
      text: '',
      thread: $routeParams.threadID
    };

    $scope.showNewPostForm = true;
  };

  $scope.cancelNewPost = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.showNewPostForm = false;
  }

  $scope.submitPost = function () {
    var success = function (response) {
      var now = new Date();
      response.created_date = now.toLocaleString();
      response.last_edited_date = now.toLocaleString();
      response.author = $scope.user.username;
      $scope.thread.posts.push(response);
      $scope.showNewPostForm = false;
    };

    var failure = function (response) {
      console.log(response);
    };

    Forum.newPost($scope.newPost, success, failure);
  };
}]);
