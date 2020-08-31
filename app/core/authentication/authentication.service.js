'use strict';

angular.module('core.authentication')

    .factory('authenticationService',
        ['$http', '$rootScope', '$timeout', '$window', 'AclService',
            function ($http, $rootScope, $timeout, $window, AclService) {
                var service = {};
                service.Login = function (_email, _password, callback) {

                    var formData = { email: _email, password: _password, remember_me: false };

                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/api/auth/login',
                        data: formData,
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'accept': 'application/json'
                        }
                    }).then(function successCallback(response) {
                        callback(response);

                    }, function errorCallback(response) {
                        callback(response);

                    });
                };

                service.SetCredentials = function (_email, _token, _role, _permissions) {

                    $rootScope.globals = {
                        currentUser: {
                            email: _email,
                            token: _token,
                            role: _role,
                            permissions :_permissions
                        }
                    };

                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + _token; // jshint ignore:line
                    // $cookies.putObject('currentUser', $rootScope.globals);
                    $window.localStorage.setItem('currentUser', JSON.stringify($rootScope.globals));

                };

                service.ClearCredentials = function () {
                    $rootScope.globals = {};
                    // $cookies.remove('currentUser');
                    $window.localStorage.clear();
                    //add acl service to remove user 
                    $http.defaults.headers.common.Authorization = null;
                };

                service.setAclPermissions = function (_role, _permissions) {
                    let aclData = {};
                   // aclData[_role] = ['logout', 'view_users_content', 'manage_content'];
                   aclData[_role] = _permissions;
 
                   AclService.setAbilities(aclData);
                   AclService.attachRole(_role);
                }

                return service;
            }])

    .run(['$rootScope', '$location','$http', '$window', 'authenticationService',
        function ($rootScope, $location, $http, $window, authenticationService) {

            $rootScope.globals = /*$cookies.getObject('currentUser')*/ JSON.parse($window.localStorage.getItem('currentUser')) || {};

            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token;
                authenticationService.setAclPermissions($rootScope.globals.currentUser.role,$rootScope.globals.currentUser.permissions);
            }
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if ((!$rootScope.globals.currentUser) && (!next.allowAnonymus)) {
                    $location.path("/login");
                }
            });
            $rootScope.hasCookie = function () {
                if ($rootScope.globals.currentUser) { return true; } else { return false; }
            }
        }
    ]);