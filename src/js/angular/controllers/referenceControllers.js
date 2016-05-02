angular.module('portal')
.controller('AllReferenceCtrl', ['$scope', 'Reference', '$filter', function ($scope, Reference, $filter) {
  // Reference Parsing from server
  var referencesFetched = function (response) {

    var references = response.map(function (obj) {
      if (obj.metatags.length > 0) { obj.header_text = 'Marked As Having No Data'; }
      else {
        if (obj.ethicstags.length > 0) { obj.header_text = obj.ethicstags.length + ' Data Points'; }
        else { obj.header_text = 'Not Yet Analyzed' }
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
  }

    
}]);

angular.module('portal')
.controller('ReferenceDetailCtrl', ['$scope', 'Reference', '$routeParams', 'Includes', 'Meta', function ($scope, Reference, $routeParams, Includes, Meta) {
  $scope.reference = Reference.get($routeParams.referenceID);

  $scope.reference_template = Includes.get('referenceDetail');

  $scope.editReference = function () {
    $scope.reference_template = Includes.get('referenceForm');
    $scope.tempReference = {
      title: $scope.reference.title,
      url: $scope.reference.url,
      id: $scope.reference.id,
      notes: $scope.reference.notes
    }
  }

  $scope.referenceCancel = function ($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $scope.reference_template = Includes.get('referenceDetail');
  }

  Meta.query(function (data, response) {
    $scope.companies = data[0].company;
    $scope.categories = data[1].ethicssubcategory;
  });
}]);
