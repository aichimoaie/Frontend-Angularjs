'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('quizzExam').
    component('quizzExam', {
        templateUrl: 'quizz-exam/quizz-exam.template.html',
        controller: ['$scope', '$http', 'helperService',
            function quizzExamController($scope, $http, helper) {
                // $scope.quizName = 'data/csharp.js';

                // //Note: Only those configs are functional which is documented at: http://www.codeproject.com/Articles/860024/Quiz-Application-in-AngularJs
                // // Others are work in progress.
                // $scope.defaultConfig = {
                //     'allowBack': true,
                //     'allowReview': true,
                //     'autoMove': false,  // if true, it will move to next question automatically when answered.
                //     'duration': 0,  // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
                //     'pageSize': 1,
                //     'requiredAll': false,  // indicates if you must answer all the questions before submitting.
                //     'richText': false,
                //     'shuffleQuestions': false,
                //     'shuffleOptions': false,
                //     'showClock': false,
                //     'showPager': true,
                //     'theme': 'none'
                // }

                // $scope.goTo = function (index) {
                //     if (index > 0 && index <= $scope.totalItems) {
                //         $scope.currentPage = index;
                //         $scope.mode = 'quiz';
                //     }
                // }

                // $scope.onSelect = function (question, option) {
                //     if (question.QuestionTypeId == 1) {
                //         question.Options.forEach(function (element, index, array) {
                //             if (element.Id != option.Id) {
                //                 element.Selected = false;
                //                 //question.Answered = element.Id;
                //             }
                //         });
                //     }

                //     if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
                //         $scope.currentPage++;
                // }

                // $scope.onSubmit = function () {
                //     var answers = [];
                //     $scope.questions.forEach(function (q, index) {
                //         answers.push({ 'QuizId': $scope.quiz.Id, 'QuestionId': q.Id, 'Answered': q.Answered });
                //     });
                //     // Post your data to the server here. answers contains the questionId and the users' answer.
                //     //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
                //     //    alert(data);
                //     //});
                //     console.log($scope.questions);
                //     $scope.mode = 'result';
                // }

                // $scope.pageCount = function () {
                //     return Math.ceil($scope.questions.length / $scope.itemsPerPage);
                // };

                // //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
                // $scope.loadQuiz = function (file) {
                //     $http.get(file)
                //         .then(function (res) {
                //             $scope.quiz = res.data.quiz;
                //             $scope.config = helper.extend({}, $scope.defaultConfig, res.data.config);
                //             $scope.questions = $scope.config.shuffleQuestions ? helper.shuffle(res.data.questions) : res.data.questions;
                //             $scope.totalItems = $scope.questions.length;
                //             $scope.itemsPerPage = $scope.config.pageSize;
                //             $scope.currentPage = 1;
                //             $scope.mode = 'quiz';
                //             if ($scope.config.shuffleOptions)
                //                 $scope.shuffleOptions();

                //             $scope.$watch('currentPage + itemsPerPage', function () {
                //                 var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                //                     end = begin + $scope.itemsPerPage;

                //                 $scope.filteredQuestions = $scope.questions.slice(begin, end);
                //             });
                //         });
                // }

                // $scope.shuffleOptions = function () {
                //     $scope.questions.forEach(function (question) {
                //         question.Options = helper.shuffle(question.Options);
                //     });
                // }

                // $scope.loadQuiz($scope.quizName);

                // $scope.isAnswered = function (index) {
                //     var answered = 'Not Answered';
                //     $scope.questions[index].Options.forEach(function (element, index, array) {
                //         if (element.Selected == true) {
                //             answered = 'Answered';
                //             return false;
                //         }
                //     });
                //     return answered;
                // };

                // $scope.isCorrect = function (question) {
                //     var result = 'correct';
                //     question.Options.forEach(function (option, index, array) {
                //         if (helper.toBool(option.Selected) != option.IsAnswer) {
                //             result = 'wrong';
                //             return false;
                //         }
                //     });
                //     return result;
                // };


                $scope.quizName = 'data/empty-quizz.js';
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
                    var ques = JSON.stringify($scope.questions, undefined, 2);
                    console.log(ques);
                    //$scope.mode = 'result';
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
                    $scope.questions[index].options.forEach(function (element, index, array) {
                        if (element.selected == true) {
                            answered = 'Answered';
                            return false;
                        }
                    });
                    return answered;
                };

                $scope.isCorrect = function (question) {
                    var result = 'correct';
                    var options = question.options || [];
                    options.forEach(function (option, index, array) {
                        if ($scope.toBool(option.selected) != option.isAnswer) {
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
    });