angular.module('portal')
.factory('Forum', ['$resource', 'BaseUrl', function ($resource, BaseUrl) {
  var services = {},
      _categories = $resource(BaseUrl + 'forum/category/:categoryID/', {}, {
        all: {method: 'GET', params: {categoryID: 'list'}, isArray: true},
        detail: {method: 'GET'}
      }),
      _threads = $resource(BaseUrl + 'forum/threads/:threadID/', {}, {
        save: {method: 'POST', params: {categoryID: 'new'}},
        detail: {method: 'GET'}
      }),
      _posts = $resource(BaseUrl + 'forum/posts/:postID/', {}, {
        save: {method: 'POST', params: {postID: 'new'}}
      });

  services.allCategories = function () {
    return _categories.all();
  };

  services.categoryDetail = function (categoryID) {
    return _categories.detail({categoryID: categoryID});
  };

  services.threadsByCategory = function (categoryID) {
    return _threads.byCategory({categoryID: categoryID});
  };

  services.newThread = function (data, success, failure) {
    return _threads.save({}, data, success, failure);
  };

  services.threadDetail = function (threadID) {
    return _threads.detail({threadID: threadID});
  };

  services.newPost = function (data, success, failure) {
    return _posts.save({}, data, success, failure);
  };

  return services;
}]);
