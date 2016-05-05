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
  };

  $scope.tagCancel = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.tag_template = Includes.get('tagDetail');
  };
}]);

angular.module('portal')
.controller('NewTagCtrl', ['$scope', 'Tag', function ($scope, Tag) {
  $scope.newTag = { id: 0, products: [], reference: $scope.reference.id };
  $scope.error = {  error: false, msg: "" };
  $scope.state = { showNewTagForm: false };

  $scope.tagCancel = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.state.showNewTagForm = false;
  };

  $scope.showTagForm = function () {
    $scope.newTag = { id: 0, products: [], reference: $scope.reference.id };

    $scope.state.showNewTagForm = true;
  };

  // resusable function to parse tag data when returned from server
  function parseTag(data) {
      // Replace element IDs with actual names
      data.company = $.grep($scope.companies,function(v) {return v.id === data.company;})[0].name;
      var category = $.grep($scope.categories,function(v) {return v.id === $scope.newTag.subcategory;})[0];

      data.tag_type = {
        name: $.grep(category.tag_types, function(v) {return v.id === data.tag_type;})[0].name,
        subcategory: category.name,
        id: data.tag_type
      };

      $scope.reference.ethicstags.push(data);
  }

  $scope.tagSubmit = function () {
    var failure = function (response) {
      $scope.error.msg = JSON.stringify(response.data);
      $scope.error.error = true;
    };

    var success = function (response) {
      if (response.isArray) {
        for (var i=0; i < response.length; i++) {
          parseTag(response[i]);
        }
      } else {
        parseTag(response)
      }

      $scope.state.showNewTagForm = false;
    };
    
    Tag.createTag($scope.newTag, success, failure);
  };

}]);

angular.module('portal')
.controller('TagFormCtrl', ['$scope', 'Tag', 'BaseUrl', 'ArrayTools', function ($scope, Tag, BaseUrl, ArrayTools) {


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

  $scope.productListUrl = BaseUrl + 'products/products/list/?company_id= ' + $scope.newTag.company + '&name=';

  // remove a product from the list of selected products
  $scope.removeProduct = function ($event,product) {
    $event.preventDefault();
    $event.stopPropagation();

    ArrayTools.removeFromList(product,$scope.newTag.products);
  };

  // Switches to the appropriate set of TagTypes when an ethical category is selected
  $scope.loadFacts = function () {
    $scope.tagTypes = $.grep($scope.categories,function(v) {return v.id === $scope.newTag.subcategory;})[0].tag_types;
  };

  // Clear products when the company changes
  // This enforces the only showing products of the selected company 
  $scope.clearProducts = function () {
    $scope.productListUrl = BaseUrl + 'products/products/list/?company_id= ' + $scope.newTag.company + '&name=';
    $scope.newTag.products = [];
  };

  // function to check for an object by ID
  function checkForObject (obj, list) {
    var i;
    for (i=0; i < list.length; i++) {
      if( list[i].id === obj.id) {
        return true
      }
    }

    return false;
  }

  // function for adding a product
  $scope.selectedProduct = function ($item) {
    // check if item is already in the array
    if(checkForObject($item.originalObject,$scope.newTag.products)) {
        // if product already added, raise error
        $scope.error.msg = "That product has already been selected";
        $scope.error.error = true;
    } else {
        // otherwise, add the product to the array
        $scope.newTag.products.push($item.originalObject);
        $scope.error.error = false;
    }
  };
}]);
