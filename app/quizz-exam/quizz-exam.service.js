'use strict';

angular.
    module('quizzExam').
    service('helperService', ['$http',
        function ($http) {
            return {
                // list: function (callback) {
                //     $http({
                //         method: 'GET',
                //         url: 'http://localhost:8000/api/sallary '
                //     }).then(function successCallback(response) {
                //         callback(response.data.sallaryList);

                //     }, function errorCallback(response) {
                //         callback(response);

                //     });
                // },

                // store: function (_name, _date, _ammount, callback) {
                //     var formData = {
                //         name: _name,
                //         date: _date,
                //         ammount: _ammount
                //     };

                //     $http({
                //         method: 'POST',
                //         url: 'http://localhost:8000/api/sallary',
                //         data: formData,
                //         headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                //     }).then(function successCallback(response) {

                //         callback(response.data);

                //     }, function errorCallback(response) {
                //         callback(response);

                //     });
                // },
                // update: function (_id, _ammount, callback) {

                //     var formData = { ammount: _ammount };

                //     $http({
                //         method: 'PATCH',
                //         url: 'http://localhost:8000/api/sallary/' + _id,
                //         data: formData,
                //         headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                //     }).then(function successCallback(response) {

                //         callback(response.data);

                //     }, function errorCallback(response) {
                //         callback(response);

                //     });

                // },
                // destroy: function (inputID, callback) {


                //     $http({
                //         method: 'DELETE',
                //         url: 'http://localhost:8000/api/sallary/' + inputID,
                //         headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                //     }).then(function successCallback(response) {

                //         callback(response.data);

                //     }, function errorCallback(response) {
                //         callback(response);

                //     });

                // },


                find: function (id, callback) {
                    $http({
                        method: 'GET',
                        url: 'country_' + id + '.json',
                        cache: true
                    }).success(callback);
                },

                toBool: function (val) {
                    if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
                        return false;
                    else if (val == true || val == 'true' || val == 'True')
                        return true;
                    else
                        return 'unidentified';
                },
                shuffle: function (array) {
                    var currentIndex = array.length, temp, randomIndex;

                    while (0 !== currentIndex) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        temp = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temp;
                    }
                    return array;
                },
                extend: function (out) {
                    out = out || {};

                    for (var i = 1; i < arguments.length; i++) {
                        if (!arguments[i])
                            continue;

                        for (var key in arguments[i]) {
                            if (arguments[i].hasOwnProperty(key))
                                out[key] = arguments[i][key];
                        }
                    }
                    return out;
                },

                createNewQuiz: function () {
                    //aici cred ca trebuie call care returneaza un pk si este asociat un profesor si o clasa si ma
                    // PK ID quizz AUTO INCREMENT, FOREIGN KEY PROFESOR SI CLASA??? 
                    // JSON FIELD EMPTY AT FIRST
                    var obj ={
                        "quiz": {
                            "id": 1,
                            "name": "<Enter Quiz Name>",
                            "description": "<Enter Quiz Description>"
                        },
                        "questions": [{
                            "id": 101,
                            "name": "Which of the following assemblies can be stored in Global Assembly Cache?", 
                            "questionTypeId": 1,
                            "options": [
                                { "Id": 1001, "questionId": 101, "name": "<Add your option here>", "isAnswer": true },
                                { "Id": 1002, "questionId": 101, "name": "<Add your option here>", "isAnswer": false },
                                { "Id": 1003, "questionId": 101, "name": "<Add your option here>", "isAnswer": false },
                                { "Id": 1004, "questionId": 101, "name": "<Add your option here>", "isAnswer": false }],
                            "questionType": { "id": 1, "name": "Multiple Choice", "isActive": true }
                        }]
                    };
                    return obj;
                },

                createNewQuestion: function () {
                    //aici cred ca trebuie call care returneaza un pk si este asociat un profesor si o clasa si ma
                    // PK ID quizz AUTO INCREMENT, FOREIGN KEY PROFESOR SI CLASA??? 
                    // JSON FIELD EMPTY AT FIRST
                    var obj ={
                        
                            "id": 101,
                            "name": "Which of the following assemblies can be stored in Global Assembly Cache?", 
                            "questionTypeId": 1,
                            "options": [
                                { "Id": 1001, "questionId": 101, "name": "<Add your option here>", "isAnswer": true },
                                { "Id": 1002, "questionId": 101, "name": "<Add your option here>", "isAnswer": false },
                                { "Id": 1003, "questionId": 101, "name": "<Add your option here>", "isAnswer": false },
                                { "Id": 1004, "questionId": 101, "name": "<Add your option here>", "isAnswer": false }],
                         "questionType": { "id": 1, "name": "Multiple Choice", "isActive": true }
                        
                    };
                    return obj;
                }
            }
        }
    ]);

