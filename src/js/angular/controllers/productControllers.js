angular.module('portal')
.controller('ProductDetailCtrl', ['$scope', 'Product', 'Company', '$routeParams', 'Scores', function ($scope, Product, Company, $routeParams, Scores) {

  // get name of the current company
  var productID = $routeParams.productID;

  // Font Awesome Icons for tag categories
  $scope.categoryIcons = Scores.getCategoryIcons();

  // Dummy Blank Data for score charts
  $scope.scores = [
    {
      'category' : '',
      'scores': []
    }
  ];
  
  // API Calls 
  var parseScores = function (response) {
    $scope.scores = Scores.parseScores(response);
  };

  Product.getScores(productID, parseScores);

  var countTags = function (response) {
    var count = 0;
    for (var i=0; i < response.length; i++) {
      count += response[i].tags.length;
    }
    $scope.product_tag_count = count;
  }

  $scope.product_tags = Product.allTags(productID, countTags);

  var productFollowUp = function (response) {
    $scope.product = response;

    $scope.company_tags = Company.allTags(response.company);
  };

  Product.detail(productID, productFollowUp);

}]);
