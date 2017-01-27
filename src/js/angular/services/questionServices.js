angular.module('portal')
.factory('Question', ['BaseUrl', '$resource', function (BaseUrl, $resource) {
  var services = {},
      _question = $resource(BaseUrl + 'profile/question/:questionDetail/', {}, {
        withAnswers: {method: 'GET', params: {questionDetail: 'all-answers'}, isArray: true},
        save: {method: 'POST', params: {questionDetail: 'new'}},
        all: {method: 'GET', params: {questionDetail: 'all'}, isArray: true}
      }),
      _answers = $resource(BaseUrl + 'profile/question/:answerNum/:answerID/', {}, {
        setInitial: {method: 'POST', params: {answerNum: 'answers', answerID: 'set'}},
        withModifiers: {method: 'GET', params: {answerNum: 'answers'}}
      }),
      _singleQuestion = $resource(BaseUrl + 'profile/question/answer/:questionID/:answerAction/', {}, {
        addAnswer: {method: 'POST', params: {answerAction: 'new'}},
        updateList: {method: 'PUT', params: {answerAction: 'updateAll'}, isArray: true},
      }),
      _answerOptions = [
    {"value": 5, "display": "+5"},
    {"value": 4, "display": "+4"},
    {"value": 3, "display": "+3"},
    {"value": 2, "display": "+2"},
    {"value": 1, "display": "+1"},
    {"value": 0, "display": "0"},
    {"value": -1, "display": "-1"},
    {"value": -2, "display": "-2"},
    {"value": -3, "display": "-3"},
    {"value": -4, "display": "-4"},
    {"value": -5, "display": "-5"}
  ];

  services.allWithAnswers = function () {
    return _question.withAnswers();
  };

  services.initialAnswers = function (answers, success) {
    return _answers.setInitial({}, {answers: answers}, success);
  };

  services.newQuestion = function (data, success, failure) {
    return _question.save({}, data, success, failure);
  };

  services.all = function () {
    return _question.all();
  };

  services.updateAnswers = function (questionID, data, success, failure) {
    return _singleQuestion.updateList({questionID: questionID}, data, success, failure);
  };

  services.answerOptions = function () {
    return _answerOptions;
  };

  services.withModifiers = function (questionID) {
    return _answers.withModifiers({answerID: questionID});
  };

  services.newAnswer = function (questionID, data, success, failure) {
    return _singleQuestion.addAnswer({questionID: questionID}, data, success, failure);
  };

  return services;
}]);
