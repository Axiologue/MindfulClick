angular.module('portal')
.controller('CompanyDetailCtrl', ['$scope', 'Company', '$routeParams', function ($scope, Company, $routeParams) {
  var name = $routeParams.companyName.replace('-', ' ');

  $scope.company = Company.detail(name);

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

  $scope.scores = [
    {
      'category' : '',
      'scores': []
    }
  ];
  
  Company.getScores(name, parseScores);

  /*
  $scope.scores = [
    {  
      'category': 'overall',
      'scores': [
        {'name': 'Generic Liberal', 'score': 1.3},
        {'name': 'Generic Conservative', 'score': -2.1},
        {'name': 'kid_for_today', 'score': 3}
      ]
    },
    {  
      'category': 'Environment',
      'scores': [
        {'name': 'Generic Liberal', 'score': 2.1},
        {'name': 'Generic Conservative', 'score': 0},
        {'name': 'kid_for_today', 'score': 2.4}
      ]
    }
  ];
  */
}]);
