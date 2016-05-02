angular.module('portal')
.controller('TagListCtrl', ['$scope', 'Tag', 'Scores', function ($scope, Tag, Scores) {
  // Font Awesome Icons for tag categories
  $scope.categoryIcons = Scores.getCategoryIcons();

  $scope.tags = Tag.all();

}]);

angular.module('portal')
.controller('SingleTagCtrl', ['$scope', 'Tag', 'Includes', function ($scope, Tag, Includes) {
  $scope.tag_template = Includes.get('tagDetail');

  $scope.editTag = function () {
    $scope.tag_template = Includes.get('tagForm');
    $scope.newTag = $.extend({}, $scope.tag);
    console.log($scope.newTag);
  }

  $scope.tagCancel = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.tag_template = Includes.get('tagDetail');
  }
}]);

angular.module('portal')
.controller('NewTagCtrl', ['$scope', 'Tag', function ($scope, Tag) {

}]);

angular.module('portal')
.controller('TagFormCtrl', ['$scope', 'Tag', function ($scope, Tag) {
  $scope.tagFormState = {
    addTagType: false
  };

  // Shows the form to add new Tag Type
  $scope.showNewTagType = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.tagFormState.addTagType = !$scope.tagFormState.addTagType;
    $scope.newTagType = { name: '' };
  };
}]);
