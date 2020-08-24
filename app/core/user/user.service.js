'use strict';

angular.module('core.user')

    .factory('userService',
        ['$http',
            function ($http) {
                var service = {};


                service.index = function (callback) {


                    $http({
                        method: 'GET',
                        url: 'http://localhost:8000/api/auth/users',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        }
                    }).then(function successCallback(response) {
                        callback(response.data.users);

                    }, function errorCallback(response) {
                        callback(response);

                    });
                };



                service.store = function (_name, _email, _password, callback) {


                    var formData = {
                        name: _name,
                        email: _email,
                        password: _password,
                        password_confirmation: _password
                    };

                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/api/auth/users',
                        data: formData,
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        }
                    }).then(function successCallback(response) {
                        callback(response);

                    }, function errorCallback(response) {
                        callback(response);

                    });
                };

                service.update =function(_id, _name, _email, callback){
            
                    var formData={name: _name, email: _email};
                    
                    $http({
                        method: 'PATCH',
                        url: 'http://localhost:8000/api/auth/users/' + _id,
                        data: formData,
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {
                      
                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });

                },
                service.destroy =function(_id, callback){
            
    
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:8000/api/auth/users/' + _id,
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {
                      
                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });

                }

                service.rolesIndex =function( callback){            
    
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8000/api/auth/users/roles',
                        headers : {'Content-Type': 'application/json; charset=UTF-8'} 
                    }).then(function successCallback(response) {

                        callback(response.data);
                
                    }, function errorCallback(response) {
                        callback(response);
                
                    });

                }


                service.searchRoleObject=function(nameKey, myArray){
                    for (var i=0; i < myArray.length; i++) {
                            if (myArray[i].name === nameKey) {
                              return myArray[i];
                             }
                        }
                    }
                

                return service;
            }])