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
    $scope.scores = Scores.parseSingleScores(response);
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

angular.module('portal')
.controller('ProductSearchCtrl', ['$scope', 'Product', 'Company', 'Includes', function ($scope, Product, Company, Includes) {
  $scope.companies = Company.getAll();
  $scope.divisions = Product.getDivisions();
  $scope.categories = Product.getCategories();
  $scope.productFormTemplate = Includes.get('productForm');
  $scope.state = { 
    priceRange: true,
    showToggle: true,
    loading: false,
    searched: false
  };
  $scope.results = [];

  // emptying product
  function resetTemp () {
    $scope.tempProduct = {
        name: "",
        company_id: "",
        division: undefined,
        category: undefined,
        price_0: "",
        price_1: "",
    };
  }

  resetTemp();

  $scope.clearForm = function ($event) {
    $event.stopPropagation();
    $event.preventDefault();

    $scope.results = [];
    $scope.state.searched = false;
    resetTemp();
  };

  $scope.productSubmit = function () {
    var productSuccess = function (response) {
      $scope.state.loading = false;
      $scope.results = response.products; 
    };
    
    $scope.state.loading = true;
    $scope.state.searched = true;
    Product.list($scope.tempProduct, productSuccess);
  };
}]);

angular.module('portal')
.controller('ProductFormCtrl', ['$scope', function ($scope) {
  $scope.toggleCollapse = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    
    $scope.toggleOpen = !$scope.toggleOpen;
    $('#productFormCollapse').collapse('toggle'); 
  }
}]);

angular.module('portal')
.controller('ProductAutoCtrl', ['$scope', function ($scope) {

}]);
