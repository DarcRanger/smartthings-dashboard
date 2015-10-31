'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.config',
    'myApp.security',
    'myApp.home',
    'myApp.account',
    'myApp.login',
    'myApp.themes.lcars',
    'myApp.lcarsPanel'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }])


	.filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
  })

  .filter('filterByKeys', function() {
    return function(input, keys) {
      var out = [];
      angular.forEach(input, function(value, key) {
        if(keys.indexOf(key) !== -1)
          out.push(value);
      });

      return out;
    };
  })

  .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
