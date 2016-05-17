angular.module('portal')
.factory('BaseUrl', [function () {
    return 'https://api.axiologue.org/';
}]);

angular.module('portal')
.factory('chartUtils', [function () {
  var services = {};

  // D3 text wrapper function
  // Taken from http://bl.ocks.org/mbostock/7555321
  services.wrap = function (text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.data()[0].label.toUpperCase().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1, // ems
          y = text.attr("y"),
          x = text.attr('x'),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
      if (lineNumber > 0) {
       text.attr("y", function () {
        return y - (lineNumber * 16)/2;
       });
      }
    });
  };

  return services;
}]);

angular.module('portal')
.factory('Scores', [function () {
  var services = {},
      _categoryIcons = {
        'Animal Welfare': 'paw',
        'Consumer Health': 'ambulance',
        'Corporate Finances': 'dollar',
        'Environment': 'leaf',
        'Labor': 'suitcase', 
        'Public Engagement': 'bullhorn'
  }; 

  services.getCategoryIcons = function () {
    return _categoryIcons;
  };

  services.parseSingleScores = function (scores) {
    var data = [];

    for (var j=0; j < scores[0].categories.length + 1; j++) { 
      var category = {
        'label': j === 0 ? 'overall' : scores[0].categories[j-1].category,
        'scores': []
      };

      for (var i=0; i < scores.length; i++) {
        var score = {
          'user': scores[i].user,
          'score': j === 0 ? scores[i].overall : scores[i].categories[j-1].score
        };
       
        category.scores.push(score);
      }

      data.push(category);
    }

    return data;
  };

  services.parseMultiScores = function (scores) {
    var data = [];

    for (var i=0; i < scores.length; i++) {
      var dataPoint = {'label': scores[i].Company.name, 'scores': []};

      for (var j=0; j < scores[i].scores.length; j++) {
        dataPoint.scores.push({'user': scores[i].scores[j].user, 'score': scores[i].scores[j].overall});
      }

      data.push(dataPoint);
    }

    return data;
  };

  return services;
}]);

angular.module('portal')
.factory('LinkStore', [function () {
  var services = {},
      _storedLink = "/";

  services.set = function (link) {
    _storedLink = link;
  };

  services.get = function () {
    return _storedLink;
  };

  return services;
}]);

angular.module('portal')
.factory('Includes', [function () {
  var services = {},
      _includes = {
        generalSearchForm: 'templates/includes/general_search_form.html',
        productForm: 'templates/includes/product_form.html',
        tagForm: 'templates/includes/tag_form.html',
        tagDetail: 'templates/includes/tag_detail.html',
        referenceForm: 'templates/includes/reference_form.html',
        referenceDetail: 'templates/includes/reference_detail.html',
        modal: 'templates/includes/modal.html'
      };

  services.get = function (templateName) {
    return _includes[templateName];
  };

  return services;
}]);

angular.module('portal')
.factory('ArrayTools', [function () {
  var services = {};

  services.removeFromList = function (item, list) {
    var index = 0;
      list.some(function(elem, i) {
        if (elem.id === item.id) {
          index = i;
          return true;
        }
      });
      list.splice(index,1);
  };

  return services;
}]);
