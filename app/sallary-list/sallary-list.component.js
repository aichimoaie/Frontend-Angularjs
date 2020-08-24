'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
    module('sallaryList').
    component('sallaryList', {
        templateUrl: 'sallary-list/sallary-list.template.html',
        controller: ['SallaryService',
            function sallaryListController(SallaryService) {
                var self = this;

                self.valueObject = {
                    id: null,
                    name: "",
                    ammount: "",
                    date: null

                }

                self.index = function () {

                    SallaryService.list(function (response) {
                        self.sallaryList = response;
                        alert(JSON.stringify(response));
                        //console.log(JSON.stringify(response));
                    });
                }

                self.index();

                self.store = function () {
                    var name = self.valueObject.name;
                    var date = self.valueObject.date;
                    var ammount = self.valueObject.ammount;


                    SallaryService.store(name, date, ammount, function (response) {
                        console.log(JSON.stringify(response));
                        if (response.message = "Created successfully") {
                            self.index();
                        }
                    });

                };

                self.show = function () {
                    var input = self.valueObject.id;

                    SallaryService.show(input, function (response) {
                        console.log(JSON.stringify(response));
                    });

                };


                self.update = function () {
                    var inputID = self.valueObject.id;
                    var ammount = self.valueObject.ammount;
                    SallaryService.update(inputID ,ammount, function (response) {
                        if (response.message = "Successfully updated") {
                            self.index();
                        }
                        else { alert(response.message); }
                    });
                };

                self.destroy = function () {
                    var inputID = self.valueObject.id;
                    SallaryService.destroy(inputID, function (response) {
                        if (response.message = "Deleted") {
                            self.index();
                        }
                        else { alert(response.message); }
                    });
                };

                self.selectedRow = 0;
                self.rowHighilited = function (_id, _name, _date, _ammount) {
                    self.selectedRow = _id;
                    self.valueObject.id = _id;
                    self.valueObject.name = _name;
                    self.valueObject.date = _date;
                    self.valueObject.ammount = _ammount;

                };
            }
        ]
    })
