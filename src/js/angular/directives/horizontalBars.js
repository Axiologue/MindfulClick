angular.module('portal')
.directive('horizontalBars', ['$window', 'chartUtils', function ($window, chartUtils) {
  return {
    restrict: 'E',
    scope: {
      data: '=' 
    },
    link: function(scope, element, attrs) {
      // attribute settings: can be re-defined on object
      var marginTop = parseInt(attrs.marginTop) || 70,
          marginBottom = parseInt(attrs.marginBottom) || 50,
          barHeight = parseInt(attrs.barHeigh) || 20,
          barPadding = parseInt(attrs.barPadding) || 5,
          barClass = attrs.barClass || 'horizontal-bar',
          titleClass = attrs.titleClass || 'horizontal-bar-title',
          appendNameToClass = attrs.appendName ? attrs.appendName === 'true' : true,
          chartGap = attrs.chartGap || 20,
          titleSpace = attrs.titleSpace || 120;


      var svg = d3.select(element[0])
        .append('svg')
        .style('width', '100%');

      // Browser resize event
      window.onresize = function () {
        scope.$apply();
      };


      // re-render data on resize
      scope.$watch(function () {
        return angular.element($window)[0].innerWidth;
      }, function () {
        scope.render(scope.data);
      });


      // watch for data changes and re-render
      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);


      // Elements that should be (re)-drawn on every render
      scope.render = function (data) {
        svg.selectAll('*').remove();

        // Calculated values
        var nodeWidth = d3.select(element[0]).node().offsetWidth,
            height = data.length * (chartGap + data[0].scores.length * (barHeight + barPadding)),
            marginLeft = nodeWidth > 768 ? parseInt(attrs.marginLeft) || 10 : 10,
            marginRight = nodeWidth > 768 ? parseInt(attrs.marginRight) || 50 : 10,
            width = nodeWidth - marginLeft - marginRight - titleSpace,
            xScale = d3.scale.linear()
              .domain([0, 5])
              .range([0, width/2]), 
            xAxis = d3.svg.axis()
              .scale(d3.scale.linear().domain([-5, 5]).range([0, width]))
              .tickValues([-5,-4,-3,-2,-1,0,1,2,3,4,5])
              .tickSize(height - chartGap)
              .orient('top'),
            chartHeight = data[0].scores.length * (barHeight + barPadding);

        svg.attr('height', height + marginTop + marginBottom);
        
        /*
        var darkerHalf = svg.append('rect')
          .attr('x', titleSpace + marginLeft)
          .attr('y', marginTop)
          .attr('width', width/2)
          .attr('height', height)
          .attr('class', 'negative-back');
        */

        // Axes
        var axis = svg.append('g')
          .attr('transform', 'translate(' + (titleSpace + marginLeft) + ',' + (height + marginTop - chartGap) + ')')
          .attr("class", "x axis")
          .call(xAxis);

        axis.selectAll('text')
          .attr('dy', -5);

        // Wrapper to enforce margins
        var wrapper = svg.append('g')
          .attr('width', width)
          .attr('height', height)
          .attr('transform', 'translate(' + (titleSpace + marginLeft) + ',' + marginTop + ')')
          .attr('class','chart-wrapper');


        // For each subset of data, create a group and move to the appropriate position
        var charts = wrapper.selectAll('g.chart')
          .data(data).enter()
          .append('g').attr('class', 'chart')
          .attr('transform', function (d, i) {
            return 'translate(0, ' + (i * (chartGap + chartHeight)) + ')'; 
          });


        // Axis whiteout
        charts.append('rect')
          .attr('class', 'whiteout')
          .attr('width', width)
          .attr('height', chartGap)
          .attr('x', 0)
          .attr('y', chartHeight);


        // Individual Chart Wrapper
        charts.append('rect')
          .attr('class', titleClass + '-rect')
          .attr('width', width)
          .attr('height', data[0].scores.length * (barHeight + barPadding))
          .attr('x', 0)
          .attr('y', 0);


        // Section Labels
        var categories = charts.append('text')
          .attr('text-anchor', 'end')
          .attr('x', -5)
          .attr('y', function (d,i) {
            return (chartHeight/2);
          })
          .attr('dy','.35em')
          .attr('class', titleClass)
          .call(chartUtils.wrap, titleSpace); 

        categories.call(chartUtils.wrap, titleSpace);

        // Draw Hoziontal Bars for each subset of data
        var bars = charts.selectAll('rect.bar')
          .data(function (d) { return d.scores; }).enter()
          .append('rect')
          .attr('class', function (d) {
            return appendNameToClass ? 'bar ' + barClass + ' ' + d.name.replace('_', '-') : 'bar ' + barClass;
          })
          .attr('height', barHeight)
          .attr('width', 0)
          .attr('x', width/2)
          .attr('y', function (d, i) {
            return barPadding/2 + i * (barHeight + barPadding);
          });


        var scoresText = charts.selectAll('text.score-text')
          .data(function (d) { return d.scores; }).enter()
          .append('text')
          .attr('class', function (d) { 
            return appendNameToClass ? 'score-text ' + d.name.replace('_', '-') : 'score-text';
          })
          .attr('text-anchor', function (d) {
            var anchor;

            if (d.score < 0) {
              anchor = 'end';
            } else {
              if (d.score > 0) {
                anchor = 'start';
              } else {
                anchor = 'middle';
              }
            }
            
            return anchor;  
          })
          .attr('y', function (d, i) {
            return barPadding/2 + barHeight/2 + i * (barHeight + barPadding);
          })
          .attr('dy','.35em')
          .attr('x', function (d) {
            var dist = xScale(Math.abs(d.score)),
                pos = width/2;

            if (d.score < 0) pos -= dist + 5;
            if (d.score > 0) pos += dist + 5;
            
            return pos; 
          })
          .text(function (d) {
            return d.score; 
          });
          

        // Animate Bars
        bars.transition()
          .duration(1000)
          .attr('x', function (d) {
            return d.score < 0 ? width/2 - xScale(Math.abs(d.score)) : width/2;
          })
          .attr('width', function (d) {
            return xScale(Math.abs(d.score)); 
          });

      };

    }
  };

}]);
