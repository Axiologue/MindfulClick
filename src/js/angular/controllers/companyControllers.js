angular.module('portal')
.controller('CompanyDetailCtrl', ['$scope', 'Company', '$routeParams', 'Scores', function ($scope, Company, $routeParams, Scores) {

  // get name of the current company
  var name = $routeParams.companyName.replace('-', ' ');

  // Font Awesome Icons for tag categories
  $scope.categoryIcons = Scores.getCategoryIcons();


  // Convert data to usable form
  var parseScores = function (response) {
    $scope.scores = Scores.parseScores(response);
  };

  // Dummy Blank Data for score charts
  $scope.scores = [
    {
      'category' : '',
      'scores': []
    }
  ];
  
  // API Calls 
  Company.getScores(name, parseScores);
  $scope.company = Company.detail(name);
  $scope.tags = Company.allTags(name)

}]);
