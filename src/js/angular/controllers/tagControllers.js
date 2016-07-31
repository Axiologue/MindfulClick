angular.module('portal')
.controller('TagListCtrl', ['$scope', 'Tag', 'Scores', function ($scope, Tag, Scores) {
  // Font Awesome Icons for tag categories
  $scope.categoryIcons = Scores.getCategoryIcons();

  $scope.tags = Tag.all();

}]);

angular.module('portal')
.controller('SingleTagCtrl', ['$scope', 'Tag', 'Includes', 'ArrayTools', function ($scope, Tag, Includes, ArrayTools) {
  $scope.tag_template = Includes.get('tagDetail');

  $scope.editTag = function () {
    $scope.tag_template = Includes.get('tagForm');
    $scope.newTag = $.extend({}, $scope.tag);
   // Get company and category ids
    $scope.newTag.company = $.grep($scope.companies,function(v) {return v.name === $scope.newTag.company;})[0].id;
    var category = $.grep($scope.categories,function(v) {return v.name === $scope.newTag.tag_type.subcategory;})[0];
    $scope.newTag.subcategory = category.id;

    // Add the appropriate tagTypes for that category
    $scope.tagTypes = category.tag_types;
    $scope.newTag.tag_type = $scope.tag.tag_type.id;

    // Add the attached product if it exists, otherwise set newTag.products to empty
    $scope.newTag.products = $scope.tag.product ? [$scope.tag.product] : []
    $scope.newTag.reference = $scope.reference.id;
  };

  $scope.tagCancel = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.tag_template = Includes.get('tagDetail');
  };

  $scope.tagSubmit = function () {
    var success = function (response) {
      $scope.tag = $.extend({}, Tag.parseResponse(response, $scope.newTag.subcategory, $scope.companies, $scope.categories));
      $scope.tag_template = Includes.get('tagDetail');
    };

    var failure = function (response) {
      $scope.error.msg = JSON.stringify(response.data);
      $scope.error.error = true;
    };

    // update the product if it exists
    // then remove the products field
    if($scope.newTag.products) {
      if ($scope.newTag.products[0]) {
        $scope.newTag.product=$scope.newTag.products[0].id;
      }
    }

    // copy the from data, strip the products
    var postData = $.extend({},$scope.newTag);
    delete postData.products;

    Tag.update(postData, success, failure);
  };

    // Delete modal info
  $scope.modalContent = {
    id: 'tag-delete-' + $scope.tag.id,
    title: 'Delete This Tag?',
    body: 'Are you sure you want to delete the tag ' + $scope.tag.company + ': ' + $scope.tag.tag_type.name + '?  This action cannot be undone.',
    actionName: 'Delete'
  };
  $scope.modalTemplate = Includes.get('modal');

  $scope.deleteTag = function () {
    $('#tag-delete-' + $scope.tag.id).modal('toggle');
  }

  $scope.modalAction = function () {
    var success = function (response) {
      ArrayTools.removeFromList(response, $scope.reference.ethicstags);

      // Code to programmatically dismiss Bootstrap modal overlay
      $('#tag-delete-' + $scope.tag.id).modal('toggle');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    };

    Tag.remove($scope.tag.id, success);

  }

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

  $scope.tagSubmit = function () {
    var failure = function (response) {
      $scope.error.msg = JSON.stringify(response.data);
      $scope.error.error = true;
    };

    var success = function (response) {
      if (response.isArray) {
        for (var i=0; i < response.length; i++) {
          Tag.parseResponse(response[i], $scope.newTag.subcategory, $scope.companies, $scope.categories);
          $scope.reference.ethicstags.push(response[i]);
        }
      } else {
        Tag.parseResponse(response, $scope.newTag.subcategory, $scope.companies, $scope.categories)
        $scope.reference.ethicstags.push(response);
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

    $scope.newTypeError = {'error': ""};

    $scope.tagFormState.addTagType = true;
    $scope.newTagType = { name: '' };
  };

  // Cancels adding a new Tag Type
  $scope.cancelAddType = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.tagFormState.addTagType = false;
  };

  $scope.submitTagType = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    var newTypeSuccess = function (response) {
      $scope.tagTypes.push(response)
      $scope.newTag.tag_type = response.id;
      $scope.tagFormState.addTagType = false;
    };

    var newTypeFailure = function (response) {
      $scope.newTypeError.error = response.data;
      console.log(response.data);
    };

    if (!$scope.newTagType.name) {
      $scope.newTypeError.error = "Please enter a new Tag Type or cancel";
    } else {
      $scope.newTagType.subcategory = $scope.newTag.subcategory;
      Tag.createType($scope.newTagType, newTypeSuccess, newTypeFailure);
    }
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
