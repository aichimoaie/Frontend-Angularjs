'use strict';

angular.module('core.registration')

    .factory('registrationService',
        ['$http',
            function ($http) {
                var service = {};

               
                service.Register = function (_name, _email, _password, _password_confirmation, callback) {
                    var formData = {
                        name: _name,
                        email: _email,
                        password: _password,
                        password_confirmation: _password_confirmation
                    };

                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/api/auth/register',
                        data: formData,
                        headers: { 'Content-Type': 'application/json; charset=UTF-8',
                                    'Accept': 'application/json' }
                    }).then(function successCallback(response) {
                        callback(response);

                    }, function errorCallback(response) {
                        callback(response);

                    });
                };
                return service;
            }])