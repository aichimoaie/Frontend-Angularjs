'use strict';

angular.
  module('phonecatApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>',
          allowAnonymus: true
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        when('/office', {
          template: '<office-list></office-list>'
        }).
        when('/sallary', {
          template: '<sallary-list></sallary-list>'
        }).
        when('/login', {
          template: '<authentication></authentication>',
          allowAnonymus: true
        }).
        when('/register', {
          template: '<registration></registration>',
          allowAnonymus: true
        }).
        when('/user', {
          template: '<user-list></user-list>',
          allowAnonymus: true
        }).
        when('/:countryId', {
          template: '<country-detail></country-detail>'
        }).
     
        otherwise('/phones');
    }
  ]);
