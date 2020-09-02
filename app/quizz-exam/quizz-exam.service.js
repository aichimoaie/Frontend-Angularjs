'use strict';

angular.
    module('quizzExam').
    factory('helperService', ['$http',
        function ($http) {
            let id =100;
            
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
                            "Id": id,
                            "Name": "", //enter quizz name
                            "Description": "" // enter quizz description 
                        },
                        "questions": [{
                            "Id": id,
                            "Name": "", //enter question here 
                            "QuestionTypeId": 1,
                            "options": [
                                { "Id": 1001, "questionId": id, "Name": "", "isAnswer": true },
                                { "Id": 1002, "questionId": id, "Name": "", "isAnswer": false },
                                { "Id": 1003, "questionId": id, "Name": "", "isAnswer": false },
                                { "Id": 1004, "questionId": id, "Name": "", "isAnswer": false }],
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
                        
                            "Id": ++id,
                            "Name": "", //enter question here 
                            "QuestionTypeId": 1,
                            "options": [
                                { "Id": 1001, "questionId": id, "Name": "", "isAnswer": false },
                                { "Id": 1002, "questionId": id, "Name": "", "isAnswer": false },
                                { "Id": 1003, "questionId": id, "Name": "", "isAnswer": false },
                                { "Id": 1004, "questionId": id, "Name": "", "isAnswer": false }],
                         "questionType": { "id": 1, "name": "Multiple Choice", "isActive": true }
                        
                    };
                    return obj;
                },

                getQuiz : function (callback){

                    $http({
                                method: 'GET',
                                url: 'http://localhost:8000/api/quiz'
                            }).then(function successCallback(response) {
                               console.log(response.data.quizzes[0])
                               
                                callback(response.data.quizzes[0]);
        
                            }, function errorCallback(response) {
                                callback(response);
        
                            });
                },
                getListOfQuizzes : function (callback){

                    $http({
                                method: 'GET',
                                url: 'http://localhost:8000/api/quiz/list'
                            }).then(function successCallback(response) {
                                callback(response.data.quizzes);
        
                            }, function errorCallback(response) {
                                callback(response);
        
                            });
                },
                 storeQuiz: function (_payLoad,qName,qDescription,qConfig, callback) {
                    var formData = {
                        payLoad: _payLoad,
                        Name:qName,
                        Description: qDescription,
                        Config: qConfig
                    
                    };

                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/api/quiz',
                        data: formData,
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                    }).then(function successCallback(response) {

                        callback(response.data);

                    }, function errorCallback(response) {
                        callback(response);

                    });
                },



             
            }
        }
    ]);

