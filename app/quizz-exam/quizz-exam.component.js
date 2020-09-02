'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('quizzExam').
    component('quizzExam', {
        templateUrl: 'quizz-exam/quizz-exam.template.html',
        controller: ['$scope', '$http', 'helperService',
            function quizzExamController($scope, $http, helper) {

                $scope.availableComponents = ['list-quizzes', 'create-quiz', 'resolve-quiz'];
                $scope.selectedComponent = 'list-quizzes';



            }]
    });