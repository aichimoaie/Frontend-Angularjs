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



                service.store = function (_name, _email, _password, _roles, callback) {


                    var formData = {
                        name: _name,
                        email: _email,
                        password: _password,
                        password_confirmation: _password,
                        roles: _roles
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

                service.update =function(_id, _name, _email, _roles, callback){
            
                    var formData={name: _name, email: _email, roles: _roles};
                    
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


                service.findById=function(myArray,id){
                    for (var i=0; i < myArray.length; i++) {
                            if (myArray[i].id === id) {
                              return myArray[i];
                             }
                        }
                    }

                service.findByName = function(source, name) {
                    for (var i = 0; i < source.length; i++) {
                      if (source[i].name === name) {
                        return source[i];
                      }
                    }
                    throw "Couldn't find object with name: " + name;
                  }
                

                return service;
            }])