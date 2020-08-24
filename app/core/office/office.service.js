'use strict';

angular.
    module('core.office').
    factory('Office', ['$http',
        function ($http) {
            return {
                list: function (callback) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8000/api/birou'
                    }).then(function successCallback(response) {
                        callback(response.data.offices);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });
                },

                store: function (input, callback) {
                    var formData = { name : input };
    
                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/api/birou',
                        data: formData,
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {
                      
                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });
                },
                update: function(inputID,inputName, callback){
            
                    var formData={name: inputName};
                    
                    $http({
                        method: 'PATCH',
                        url: 'http://localhost:8000/api/birou/' + inputID,
                        data: formData,
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {
                      
                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });

                },
                destroy: function(inputID, callback){
            
    
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:8000/api/birou/' + inputID,
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {
                      
                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });

                },

                
                find: function (id, callback) {
                    $http({
                        method: 'GET',
                        url: 'country_' + id + '.json',
                        cache: true
                    }).success(callback);
                }

    
            }
        }
    ]);

