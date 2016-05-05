angular.module('portal')
.factory('Question', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _question = $resource(BaseUrl + 'profile/question/:questionDetail/', {}, {
        withAnswers: {method: 'GET', params: {questionDetail: 'all-answers'}, isArray: true}
      }),
      _answers = $resource(BaseUrl + 'profile/question/:answerNum/:answerID/', {}, {
        setInitial: {method: 'POST', params: {answerNum: 'answers', answerID: 'set'}} 
      });

  services.allWithAnswers = function () {
    return _question.withAnswers();
  };

  services.initialAnswers = function (answers, success) {
    return _answers.setInitial({}, {answers: answers}, success);
  };

  return services;
}]);
