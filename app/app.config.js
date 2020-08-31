'use strict';

angular.
  module('phonecatApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>',
          // allowAnonymus: true
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
        })
        // .
        // when('/user', {
        //   template: '<user-list></user-list>',
        //   allowAnonymus: true
        // })

        .when('/user', {
          //component: 'userList',
          template: '<user-list> </user-list>',
          resolve: {
            'acl': ['$q', 'AclService', function ($q, AclService) {
              if (AclService.can('view_users_content')) {
                // Does have permission
                return true;
              } else {
                // Does not have permission
                // console.log('don proper perm');
                return $q.reject('Unauthorized');
              }
            }]
          }
        }).
        when('/:countryId', {
          template: '<country-detail></country-detail>'
        }).

        otherwise('/phones');
    }
  ]);
