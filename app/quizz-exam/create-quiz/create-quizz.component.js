'use strict'

angular.
    module('quizzExam')
    .component('createQuiz', {
        templateUrl: 'quizz-exam/create-quiz/create-quiz.template.html',
        controller: ['$scope', '$http', 'helperService',
            function createQuizzController($scope, $http, helper) {
                $scope.quizName = 'data/empty-quizz.js';
               $scope.defaultConfig = {
                    'allowBack': true,
                    'allowReview': true,
                    'autoMove': false,  // if true, it will move to next question automatically when answered.
                    'duration': 0,  // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
                    'pageSize': 1,
                    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
                    'richText': false,
                    'shuffleQuestions': false,
                    'shuffleOptions': false,
                    'showClock': false,
                    'showPager': true,
                    'theme': 'none'
                }
                $scope.goTo = function (index) {
                    if (index > 0 && index <= $scope.totalItems) {
                        $scope.currentPage = index;
                        $scope.mode = 'quiz';
                    }
                }

                $scope.onSelect = function (option) {
                    $scope.questions[$scope.currentPage - 1].selected = option;
                    $scope.questions[$scope.currentPage - 1].answered = option.Id;
                }

                $scope.onSave = function () {
                    
                   // var ques = JSON.stringify($scope.questions, undefined, 2);
                   // var ques = JSON.stringify($scope.questions);
                   // alert(JSON.stringify(ques));
                  //  console.log(ques);
                    //$scope.mode = 'result';
                    helper.storeQuiz( $scope.questions, $scope.quiz.Name, $scope.quiz.Description,$scope.defaultConfig, function (res) {
                       alert(JSON.stringify(res));
                    })
                }
                $scope.itemsPerPage = 1;

                $scope.pageCount = function () {
                    return Math.ceil($scope.questions.length / $scope.itemsPerPage);
                };

                //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
                $scope.loadQuiz = function (file) {
                    let data = helper.createNewQuiz();
                    $scope.quiz = data.quiz;
                    $scope.questions = data.questions;

                    $scope.totalItems = $scope.questions.length;
                    $scope.currentPage = 1;
                    $scope.mode = 'quiz';
                    $scope.$watch('currentPage + itemsPerPage', function () {
                        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                            end = begin + $scope.itemsPerPage;

                        $scope.filteredQuestions = $scope.questions.slice(begin, end);
                    });
                }
                $scope.loadQuiz($scope.quizName);

                $scope.pushQuestion = function () {
                    let data = helper.createNewQuestion();
                    $scope.questions.push(data);
                    $scope.totalItems = $scope.questions.length;
                    $scope.currentPage++;
                    $scope.mode = 'quiz';
                    $scope.$watch('currentPage + itemsPerPage', function () {
                        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                            end = begin + $scope.itemsPerPage;

                        $scope.filteredQuestions = $scope.questions.slice(begin, end);
                    });

                }

                $scope.popQuestion = function () {

                }




                $scope.isAnswered = function (index) {
                    var answered = 'Not Answered';
                    $scope.questions[index].Options.forEach(function (element, index, array) {
                        if (element.selected == true) {
                            answered = 'Answered';
                            return false;
                        }
                    });
                    return answered;
                };

                $scope.isCorrect = function (question) {
                    var result = 'correct';
                    var options = question.Options || [];
                    options.forEach(function (option, index, array) {
                        if ($scope.toBool(option.selected) != option.IsAnswer) {
                            result = 'wrong';
                            return false;
                        }
                    });
                    return result;
                };

                //If you wish, you may create a separate utility or helper service to implement toBool. To keep things simple, i have kept it within controller.
                $scope.toBool = function (val) {
                    if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
                        return false;
                    else if (val == true || val == 'true' || val == 'True')
                        return true;
                    else
                        return 'Not Identified';
                };
            }]
    })
