angular.module('portal')
.controller('AllReferenceCtrl', ['$scope', 'Reference', '$filter', function ($scope, Reference, $filter) {
  // Reference Parsing from server
  var referencesFetched = function (response) {

    var references = response.map(function (obj) {
      if (obj.metatags.length > 0) { obj.header_text = 'Marked As Having No Data'; }
      else {
        if (obj.ethicstags.length > 0) { obj.header_text = obj.ethicstags.length + ' Data Points'; }
        else { obj.header_text = 'Not Yet Analyzed'; }
      }

      return obj;
    });

    $scope.references = references;
  };

  Reference.all(referencesFetched);

  // Filtering
  $scope.filtering = {
    includeTagged: true,
    includeUntagged: true,
    includeNoData: false,
    text: ""
  };

  $scope.filterReferences = function (item) {
    var _checkTagged = $scope.filtering.includeTagged || item.ethicstags.length === 0;
    var _checkUntagged = $scope.filtering.includeUntagged || item.ethicstags.length >  0;
    var _checkNoData = $scope.filtering.includeNoData || item.metatags.length === 0;
    var _checkText = item.title.toLowerCase().indexOf($scope.filtering.text.toLowerCase()) > -1 ||
                     item.notes.toLowerCase().indexOf($scope.filtering.text.toLowerCase()) > -1;
    return _checkText && _checkNoData && _checkUntagged && _checkTagged; 
  };

    
}]);

angular.module('portal')
.controller('ReferenceDetailCtrl', ['$scope', 'Reference', '$routeParams', 'Includes', 'Meta', function ($scope, Reference, $routeParams, Includes, Meta) {
  $scope.reference = Reference.get($routeParams.referenceID);
  $scope.error = {error: false, msg: ""};
  $scope.referenceModal = Includes.get('modal');

  $scope.reference_template = Includes.get('referenceDetail');
  $scope.tagForm = Includes.get('tagForm');

  $scope.editReference = function () {
    $scope.reference_template = Includes.get('referenceForm');
    $scope.tempReference = {
      title: $scope.reference.title,
      url: $scope.reference.url,
      id: $scope.reference.id,
      notes: $scope.reference.notes
    };
  };

  $scope.referenceCancel = function ($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $scope.reference_template = Includes.get('referenceDetail');
  };

  Meta.query(function (data, response) {
    $scope.companies = data[0].company;
    $scope.categories = data[1].ethicssubcategory;
  });

  $scope.referenceSubmit = function () {
    var success = function (response) {
      $scope.reference.title = response.title;
      $scope.reference.url = response.url;
      $scope.reference.notes = response.notes;

      $scope.reference_template = Includes.get('referenceDetail');
    };

    var failure = function (response) {
      $scope.error.msg = JSON.stringify(response.data);
      $scope.error.error = true;
    };

    Reference.update($scope.tempReference, success, failure);
  }

}]);

angular.module('portal')
.controller('NewReferenceCtrl', ['$scope', 'Reference', 'Includes', function ($scope, Reference, Includes) {
  $scope.referenceForm = Includes.get('referenceForm');

  $scope.error = {error: false,
                  msg: ""};
  $scope.success = {success: false,
                    msg: "Your article has been sucessfully submitted"};
    
  $scope.tempReference = {
      id: 0,
      url: "",
      title: "",
      notes: ""
    };

  $scope.referenceSubmit = function () {
    var success = function (data, response) {
      $scope.tempReference = {
        id: 0,
        url: "",
        title: "",
        notes: ""
      };
      $scope.error.error = false;
      $scope.success.success = true;
    };

    var failure = function (response) {
      $scope.error.msg = JSON.stringify(response.data);
      $scope.error.error = true;
      $scope.success.success = false;
    };

    Reference.create($scope.tempReference, success, failure);
  };
}]);

angular.module('portal')
.controller('ReferenceDeleteCtrl', ['$scope', 'Reference', '$location', function ($scope, Reference, $location) {
  $scope.modalContent = {
    id: 'reference-delete',
    title: 'Delete This Source?',
    body: 'Are you sure you want to delete the source ' + $scope.reference.title + '?  This action cannot be undone.',
    actionName: 'Delete'
  };

  $scope.modalAction = function () {
    var success = function () {
      // Code to programmatically dismiss Bootstrap modal overlay
      $('#reference-delete').modal('toggle');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();

      $location.path('/references/deleted');
    }

    Reference.remove($scope.reference.id, success);
  }
}]);
