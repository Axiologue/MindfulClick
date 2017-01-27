angular.module('portal')
.controller('CompanyDetailCtrl', ['$scope', 'Company', '$routeParams', 'Scores', function ($scope, Company, $routeParams, Scores) {

  // get name of the current company
  var name = Company.getName($routeParams.companyName);

  // Font Awesome Icons for tag categories
  $scope.categoryIcons = Scores.getCategoryIcons();


  // Convert data to usable form
  var parseScores = function (response) {
    $scope.scores = Scores.parseSingleScores(response);
  };

  // Dummy Blank Data for score charts
  $scope.scores = [
    {
      'label' : '',
      'scores': []
    }
  ];
  
  // API Calls 
  Company.getScores(name, parseScores);
  $scope.company = Company.detail(name);
  $scope.tags = Company.allTags(name);

}]);

angular.module('portal')
.controller('CompanyAllCtrl', ['$scope', 'Company', 'Scores', function ($scope, Company, Scores) {
  $scope.loading = true;
  $scope.companies = Company.getAll();

  $scope.filterProps = {
    showGeneric: true,
    ordering: "alphabetic"
  };

  var _scores;

  // Dummy Blank Data for score charts
  $scope.scores = [
    {
      'label' : '',
      'scores': []
    }
  ];

  // Sorting and Filtering
  function getUserScore(obj, user_name) {
    return obj.scores.filter(function (x) {return x.user === user_name;})[0].score;
  }

  function sortByUserScore(user_name) {
    return function (a, b) {
      if (getUserScore(a, user_name) > getUserScore(b, user_name)) { return -1; }
      if (getUserScore(b, user_name) > getUserScore(a, user_name)) { return 1; }
      return 0;
    };
  }

  function sortByLabel(a, b) {
    return a.label.localeCompare(b.label);
  }

  $scope.sortScores = function () {
    if ($scope.filterProps.ordering === 'alphabetic') { $scope.scores.sort(sortByLabel); }
    else { $scope.scores.sort(sortByUserScore($scope.filterProps.ordering)); }
  };

  $scope.filterScores = function () {
    // filter out the generics if required
    var scores = $scope.filterProps.showGeneric ? _scores : _scores.map(function (obj) {
      return {
        'label': obj.label,
        'scores': obj.scores.filter(function (obj) { 
          return obj.user !== 'Generic_Conservative' && obj.user !== 'Generic_Liberal';
        }) 
      };
    });
    $scope.scores = scores;
  };


  var parseScores = function (response) {
    $scope.loading = false;
    _scores = Scores.parseMultiScores(response);
    $scope.scores = _scores;
  };

  Company.allScores(parseScores);
}]);
