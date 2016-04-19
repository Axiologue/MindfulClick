angular.module('portal')
.controller('BlogDetailCtrl', ['$scope', 'Blog', '$routeParams', function ($scope, Blog, $routeParams) {
  $scope.post = Blog.getPost($routeParams.postName);
}]);

angular.module('portal')
.controller('BlogListCtrl', ['$scope', 'Blog', function ($scope, Blog) {
  $scope.posts = Blog.list();
}]);
