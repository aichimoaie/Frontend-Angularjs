'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('userList').
    component('userList', {
        templateUrl: 'user-list/user-list.template.html',
        controller: ['userService',
            function userListController(userService) {
                var self = this;

                self.valueObject = {
                    id: 0,
                    name: "",
                    email: "",
                    active: 0,
                    password :"",
                    roles : ""

                }

            
                self.index = function () {
                    userService.index(function (response) {

                        self.userList = response;
                    
                        //format date
                        self.userList.forEach((item, index) => {
                            if (self.userList[index].email_verified_at) {
                                self.userList[index].email_verified_at = self.userList[index].email_verified_at.slice(0, 10)
                            }
                        })
                    });

                };
                self.index();


                self.store = function () {
                    var name = self.valueObject.name;
                    var email = self.valueObject.email;
                    var password = self.valueObject.password;

                    userService.store(name, email, password, function (response) {
                        console.log(JSON.stringify(response));
                        if (response.message = "Created successfully") {
                            self.index();
                        }
                    });
                }


                self.update = function () {
                    var inputID = self.valueObject.id;
                    var inputName = self.valueObject.name;
                    var inputEmail = self.valueObject.email;
                    userService.update(inputID, inputName, inputEmail, function (response) {
                        if (response.message = "Updated successfully") {
                            self.index();
                        }
                        else { alert(response.message); }
                    });
                };

                // self.updatePassword = function () {
                //     var inputID = self.valueObject.id;
                //     var inputName = self.valueObject.name;
                //     var inputEmail = self.valueObject.email;
                //     userService.update(inputID, inputName, function (response) {
                //         if (response.message = "Deleted") {
                //             self.index();
                //         }
                //         else { alert(response.message); }
                //     });
                // };


                self.destroy = function () {
                    var inputID = self.valueObject.id;
                    userService.destroy(inputID, function (response) {
                        if (response.message = "Deleted") {
                            self.index();
                        }
                        else { alert(response.message); }
                    });
                };

                self.selectedRow = null;
                self.rowHighilited = function (id, name, email, active, roleSelected) {
                    self.selectedRow = id;
                    self.valueObject.id = id;
                    self.valueObject.name = name;
                    self.valueObject.email = email;
                    self.valueObject.active = active;

               
                   

                  //  self.valueObject.roles = userService.searchRoleObject(roleSelected, self.RolesList);
                   /// alert(self.valueObject.roles.id);
                    self.selRole = userService.searchRoleObject(roleSelected, self.RolesList);
                     alert(JSON.parse(self.selRole));
                };

                self.RolesIndex = function () {
                    userService.rolesIndex( function(response) {
                        if(response.message = "RolesList retrieved successfully"){
                            self.RolesList = response.Roles;
                            alert(JSON.stringify(self.RolesList))
                        }
                        else {
                            alert(JSON.stringify(response));
                        }
                    
                    
                    })
                };

                self.RolesIndex();


                self.updateSelRole = function () {
                   // self.ValueObject.Roles = $scope.selDepartament.DepartamentId;
                   self.ValueObject.Roles = self.selRole.name;
                   
                }


            }
        ]
    })
    .directive('myEdit', function () {
        return {

            controller: function() {
                self=this;
                self.selectedRow = null;
                self.rowHighilited = function (id, name, email, active) {
                    self.selectedRow = id;
                    self.valueObject.id = id;
                    self.valueObject.name = name;
                    self.valueObject.email = email;
                    self.valueObject.active = active;
                    alert("changed");

                };
              },
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
             scope: {
                 data: '='         
                 },
                 templateUrl: 'user-list/table-directive.template.html',
             }
    });
