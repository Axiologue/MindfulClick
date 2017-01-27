angular.module('portal')
.controller('ProfileCtrl', ['$scope', 'Preference', function ($scope, Preference) {
  $scope.preferences = Preference.getAll();

  $scope.options = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
}]);

angular.module('portal')
.controller('SinglePrefCtrl', ['$scope', 'Preference', function ($scope, Preference) {
  $scope.showPrefForm = false;

  $scope.openPrefForm = function () {
    $scope.showPrefForm = true;

    $scope.newPref = $.extend({}, $scope.fact);
  };

  $scope.closePrefForm = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.showPrefForm = false;
  };

  $scope.updatePref = function () {
    var prefSuccess = function (response) {
      $scope.fact.preference = response.preference;

      $scope.showPrefForm = false;
    };

    Preference.update($scope.newPref, prefSuccess);
  };
}]);

angular.module('portal')
.controller('InitialCtrl', ['$scope', 'Question', '$location', function ($scope, Question, $location) {
  $scope.questions = Question.allWithAnswers();

  $scope.selected = {};

  $scope.answerQuestions = function () {
    var answers = $scope.questions
      .filter(function (obj) { return obj.selected; })
      .map(function (obj) { return +obj.selected; });

    if (answers.length === $scope.questions.length) {
      var success = function (response) {
        $location.path('/thanks');
      };

      $scope.error = "";
      Question.initialAnswers(answers, success);
    } else {
      $scope.error = "Please select an answer for each question.";
    }
  };


}]);

angular.module('portal')
.controller('QuestionListCtrl', ['$scope', 'Question', function ($scope, Question) {

  // Store page state variables here
  $scope.state = { addQuestion: false, error: false };


  $scope.showNewQuestion = function () {
    // blank new question
    $scope.newQuestion = { question: "", supplement: "" };
    $scope.state.addQuestion = true;
  };

  $scope.cancelQuestion = function ($event) {
    $event.stopPropagation();
    $event.preventDefault();

    $scope.state.addQuestion = false;
  };

  // Get the initial list of questions
  $scope.questions = Question.all();

  $scope.addQuestion = function() {
    $scope.state.error = false;

    var success = function (response) {
      $scope.state.addQuestion = false;

      $scope.questions.push(response);
    };

    var failure = function (response) {
      $scope.state.error =  JSON.stringify(response.data);
    };

    Question.newQuestion($scope.newQuestion, success, failure);
  };
}]);

angular.module('portal')
.controller('QuestionDetailCtrl',['$scope','$routeParams','Question', function($scope, $routeParams, Question) {
  // Store page state variables here
  $scope.state = { addAnswer: false, error: false };

  $scope.showAnswerForm = function () {
    $scope.state.addAnswer = true;
    $scope.newAnswer = { answer: "" };
  };

  $scope.cancelAddAnswer = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.state.addAnswer = false;
  };

  $scope.options = Question.answerOptions();

  // Call to get ethics and answer data
  $scope.ethics = Question.withModifiers($routeParams.questionID);

  $scope.addAnswer = function () {
    // Reset any errors
    $scope.state.error = false;

    $scope.newAnswer.question = $routeParams.questionID;

    var addSuccess = function (response) {
      $scope.state.addAnswer = false;
      $scope.ethics.answers.push(response);
    };

    var addFailure = function (response) {
      $scope.state.error = JSON.stringify(response.data);
    };

    Question.newAnswer($routeParams.questionID, $scope.newAnswer, addSuccess, addFailure);
  };

  $scope.saveAnswers = function () {
    var modifySuccess = function (response) {
      console.log(response);
    };

    var modifyFailure = function (response) {
      $scope.state.error = JSON.stringify(response.data);
    };

    Question.updateAnswers($routeParams.questionID, $scope.ethics.answers, modifySuccess, modifyFailure);
  };
}]);
