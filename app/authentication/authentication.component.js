'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('authentication').
    component('authentication', {
        templateUrl: 'authentication/authentication.template.html',
        controller: ['authenticationService', '$location','$scope',
            function authenticationController(authenticationService, $location ,$scope) {
                var self = this;

                authenticationService.ClearCredentials();
                self.valueObject = {
                    email: "",
                    password: ""

                };

                self.login = function () {
                  
                    authenticationService.Login(self.valueObject.email, self.valueObject.password, function (response) {
                       
                        if (response.data.message === "Successfully logged in") {
                           
                             authenticationService.SetCredentials(response.data.email,response.data.access_token, response.data.role);
                             $location.path('/phones');
                            }
                            else if(response.data.message ==='Unauthorized'){
                                alert(JSON.stringify(response.data.message));
                            }


                    });
                }
            }
        ]
    }).
    component('registration', {
        templateUrl: 'authentication/registration.template.html',
        controller: ['registrationService',
            function registrationController(registrationService) {
                var self = this;

                self.valueObject = {
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: ""

                };


                self.register = function () {
                    registrationService.Register(self.valueObject.name, self.valueObject.email, self.valueObject.password, self.valueObject.password_confirmation, function (response) {
                     alert(JSON.stringify( response.data));
                    });


                
                }


                self.checkPasswordMatch = function () {
                    if (self.password !== self.password_confirmation) { return "Password not matching"; }

                };
            }
        ]
    })
