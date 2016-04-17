angular.module('portal')
.controller('CompanyDetailCtrl', ['$scope', 'Company', '$routeParams', function ($scope, Company, $routeParams) {

  // get name of the current company
  var name = $routeParams.companyName.replace('-', ' ');

  // Font Awesome Icons for tag categories
  $scope.categoryIcons = {
    'Animal Welfare': 'paw',
    'Consumer Health': 'ambulance',
    'Corporate Finances': 'dollar',
    'Environment': 'leaf',
    'Labor': 'suitcase', 
    'Public Engagement': 'bullhorn'
  };


  // Convert data to usable form
  var parseScores = function (response) {
    var data = [];

    for (var j=0; j < response[0].categories.length + 1; j++) { 
      var category = {
        'category': j === 0 ? 'overall' : response[0].categories[j-1].category,
        'scores': []
      };

      for (var i=0; i < response.length; i++) {
        var score = {
          'name': response[i].user,
          'score': j === 0 ? response[i].overall : response[i].categories[j-1].score
        };
       
        category.scores.push(score);
      }

      data.push(category);
    }

    $scope.scores = data;
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
