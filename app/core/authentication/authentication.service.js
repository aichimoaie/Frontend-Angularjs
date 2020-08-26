'use strict';

angular.module('core.authentication')

    .factory('authenticationService',
        ['$http', '$cookies', '$rootScope', '$timeout', '$location','$window',
            function ($http, $cookies, $rootScope, $timeout, $location,$window) {
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

                service.SetCredentials = function (_email, _token ,_role) {

                    $rootScope.globals = {
                        currentUser: {
                            email: _email,
                            token: _token,
                            role : _role
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

                return service;
            }])

    .run(['$rootScope', '$location', '$cookies', '$http','$window','AclService',
        function ($rootScope, $location, $cookies, $http,$window, AclService) {

            $rootScope.globals = /*$cookies.getObject('currentUser')*/ JSON.parse($window.localStorage.getItem('currentUser')) || {};
         
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token;
                // Set ACL ROLES 
                let role= $rootScope.globals.currentUser.role;
                alert(typeof(role));
                var aclData = {
                    'admin' : ['logout', 'view_users_content'/*, 'manage_content'*/]
                  }
                  AclService.setAbilities(aclData);
                
                  // Attach the member role to the current user
                  AclService.attachRole(role);
                 
                 console.log("user can view user cont" + AclService.can('view_users_content')); 
            
            }
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
            
                if ((!$rootScope.globals.currentUser) && (!next.allowAnonymus)) {
                    $location.path("/login");
                }

            });
            // $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //     if(!angular.isDefined($rootScope.globals.currentUser) && $cookies.getObject('currentUser')){
            //         // UserInfo exists in localstorate but not on $rootScope. This means the page was reloaded or the user is returning.
            //         $rootScope.globals.currentUser =  $cookies.getObject('currentUser');
            //     }else if(!angular.isDefined($rootScope.globals.currentUser) && !$cookies.getObject('currentUser') && (!next.allowAnonymus)){
            //         // User is not logged at all. Send him back to login page
            //         $location.path("/login");
            //     }else if(angular.isDefined($rootScope.globals.currentUser)){
            //         // User is logged in. You can run some extra validations in here.
            //         $rootScope.loggedIn=true;
            //     }
            // });


            $rootScope.hasCookie = function () {
                if ($rootScope.globals.currentUser) { return true; } else { return false; }
            }
        }
    ]);