'use strict';

angular.
    module('sallaryList').
    factory('SallaryService', ['$http',
        function ($http) {
            return {
                list: function (callback) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8000/api/sallary '
                    }).then(function successCallback(response) {
                        callback(response.data.sallaryList);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });
                },

                store: function (_name, _date, _ammount, callback) {
                    var formData = { name : _name,
                                     date : _date,
                                    ammount : _ammount };
    
                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/api/sallary',
                        data: formData,
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {
                      
                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });
                },
                update: function(_id,_ammount, callback){
            
                    var formData={ammount : _ammount};
                    
                    $http({
                        method: 'PATCH',
                        url: 'http://localhost:8000/api/sallary/' + _id,
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
                        url: 'http://localhost:8000/api/sallary/' + inputID,
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

