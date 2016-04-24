angular.module('portal')
.directive('barsLegend', ['$window', function ($window) {
  return {
    restrict: 'EA',
    scope: {
      data: '='
    },
    link: function (scope, element, attrs) {
      var legendClass = attrs.legendClass || 'bar-legend',
          width = attrs.legendWidth || 300,
          boxHeight = attrs.boxHeight || 20,
          boxPadding = attrs.boxPadding || 10,
          marginTop = attrs.marginTop || 20,
          marginBottom = attrs.marginBottom || 20,
          marginLeft = attrs.marginLeft || 20,
          marginRight = attrs.marginRight || 20,
          legendAttr = attrs.legendAttr || 'user';

      var svg = d3.select(element[0])
        .append('svg')
        .attr('width', width);

      // watch for data changes and re-render
      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);

      scope.render = function (data) {
        svg.selectAll('*').remove();

        var height = data[0].scores.length * boxHeight + (data[0].scores.length - 1) * boxPadding +  marginTop + marginBottom;

        svg.attr('height', height)
          .attr('class', legendClass);

        var row = svg.selectAll('g')
          .data(data[0].scores).enter()
          .append('g')
          .attr('transform', function (d, i) {
            return 'translate(' + marginLeft + ',' + (marginTop + i * (boxPadding + boxHeight)) + ')';
          });

        var boxes = row.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', boxHeight)
          .attr('height', boxHeight)
          .attr('class', function (d) {
            return 'horizontal-bar ' + d.user.replace('_', '-');
          });

        var text = row.append('text')
          .attr('x', boxHeight + boxPadding)
          .attr('y', boxHeight)
          .attr('dy', '-.35em')
          .text(function (d) {
            return d.user.substr(0,7) === 'Generic' ? d.user.replace('_', ' ') : 'YOU';
          });

      };
    }
  };
}]);
