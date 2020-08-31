'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('quizzExam').
    component('quizzExam', {
        templateUrl: 'quizz-exam/quizz-exam.template.html',
        controller: ['quizzService',
            function quizzExamController(quizzService) {
                var self = this;

                self.valueObject = {
                    id: 0,
                    name: "",
                    email: "",
                    active: 0,
                    password: "",
                    roles: ""

                }


                self.index = function () {

                };
                self.index();
            }]
    });