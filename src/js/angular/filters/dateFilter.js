angular.module('portal')
.filter('dateFormat', [function () {
  return function (dateString) {
    var date = new Date(dateString);
    return date.toLocaleString();
  };
}]);
