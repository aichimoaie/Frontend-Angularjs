'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('officeList').
    component('officeList', {
        templateUrl: 'office-list/office-list.template.html',
        controller: ['Office',
            function officeListController(Office) {
                var self = this;

                self.valueObject = {
                    id: 0,
                    name: ""

                }

                self.index = function () {

                    Office.list(function (response) {
                        self.countryList = response;
                        //console.log(JSON.stringify(response));
                    });
                }

                self.index();

                self.store = function () {
                    var input = self.valueObject.name;

                    Office.store(input, function (response) {
                        console.log(JSON.stringify(response));
                        if (response.message = "Created successfully") {
                            self.index();
                        }
                    });

                };

                self.show = function () {
                    var input = self.valueObject.id;

                    Office.show(input, function (response) {
                        console.log(JSON.stringify(response));
                    });

                };


                self.update = function () {
                    var inputID = self.valueObject.id;
                    var inputName = self.valueObject.name;
                    Office.update(inputID, inputName, function (response) {
                        if (response.message = "Deleted") {
                            self.index();
                        }
                        else { alert(response.message); }
                    });
                };

                self.destroy = function () {
                    var inputID = self.valueObject.id;
                    Office.destroy(inputID, function (response) {
                        if (response.message = "Deleted") {
                            self.index();
                        }
                        else { alert(response.message); }
                    });
                };
            }
        ]
    })
    .directive('myCustomer', function () {
        return {
            templateUrl: function (elem, attr) {
                return 'country-' + attr.type + '.html';
            }
        };
    });
