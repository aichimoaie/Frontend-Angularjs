'use strict'

angular.
    module('quizzExam')
    .component('listQuizzes', {
        templateUrl: 'quizz-exam/quizz-list/list-quizzes.template.html',
        controller: ['$scope', '$http', 'helperService',
            function listQuizzesController($scope, $http, helper) {

            }]
    })