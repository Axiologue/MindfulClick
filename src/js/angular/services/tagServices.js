angular.module('portal')
.factory('Tag', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _tags = $resource(BaseUrl + 'tags/etags/:tagID/', {}, {
        all: {method: 'GET', params: {tagID: 'list'}, isArray: true},
        saveMulti: {method: 'POST', params: {tagID: 'new'}, isArray: true},
        update: {method: 'PATCH'},
        remove: {method: 'DELETE'},
        recent: {method: 'GET', params: {tagID: 'recent'}, isArray: true}
      }),
      _types = $resource(BaseUrl + 'tags/etypes/:typeID/', {}, {
        create: {method: 'POST', params: {typeID: 'new'}}
      });

  services.all = function () {
    return _tags.all();
  };

  services.createTag = function (data, success, failure) {
    if (data.products.length <= 1) {
      return _tags.save({tagID: 'new'}, data, success, failure);
    } else {
      return _tags.saveMult({}, data, success, failure);
    }
  };

  services.remove = function (tagID, success) {
    return _tags.remove({tagID: tagID}, success);
  };

  services.update = function (data, success, failure) {
    return _tags.update({tagID: data.id}, data, success, failure);
  };

  // Fix data coming back from server to match display data
  services.parseResponse = function (data, cat_id, companies, categories) {
     // Replace element IDs with actual names
      data.company = $.grep(companies, function(v) {return v.id === data.company;})[0].name;
      var category = $.grep(categories ,function(v) {return v.id === cat_id;})[0];

      data.tag_type = {
        name: $.grep(category.tag_types, function(v) {return v.id === data.tag_type;})[0].name,
        subcategory: category.name,
        id: data.tag_type
      };
  
      return data;
  };

  services.createType = function (newType, success, failure) {
    return _types.create({}, newType, success, failure);
  };

  services.recent = function (success, failure) {
    return _tags.recent(success, failure);
  };

  return services;
}]);
