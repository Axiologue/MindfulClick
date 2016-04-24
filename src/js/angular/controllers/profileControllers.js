angular.module('portal')
.controller('ProfileCtrl', ['$scope', 'Preference', function ($scope, Preference) {
  $scope.preferences = Preference.getAll()

  $scope.options = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
}]);

angular.module('portal')
.controller('SinglePrefCtrl', ['$scope', 'Preference', function ($scope, Preference) {
  $scope.showPrefForm = false;

  $scope.openPrefForm = function () {
    $scope.showPrefForm = true;

    $scope.newPref = $.extend({}, $scope.fact);
  };

  $scope.closePrefForm = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.showPrefForm = false;
  };

  $scope.updatePref = function () {
    var prefSuccess = function (response) {
      $scope.fact.preference = response.preference;

      $scope.showPrefForm = false;
    };

    Preference.update($scope.newPref, prefSuccess);
  };
}]);
