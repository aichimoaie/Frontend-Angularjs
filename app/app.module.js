'use strict';

// Define the `phonecatApp` module
angular.module('phonecatApp', [
  'ngAnimate',
  'ngRoute',
  'ngCookies',
  'mm.acl',
  'ngSanitize',
  'core',
  'phoneDetail',
  'phoneList',
  'authentication',
  'officeList',
  'userList',
  'sallaryList',
  'quizzExam'
]).controller('IndexController', ['$scope','AclService', function($scope, AclService){
  $scope.can=AclService.can;
}]);
