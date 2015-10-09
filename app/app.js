'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.config',
    'myApp.security',
    'myApp.home',
    'myApp.account',
    'myApp.login',
    'myApp.themes.lcars'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }])

	.controller('MenuCtrl', function($scope, $rootScope, $location) {
	  
	  $scope.menu = [
	    {label:'Home', route:'#/home'},
	    {label:'LCARS', route:'#/lcars'},
      {label:'Account', route:'#/account'}
	   ]
	  
	  $scope.menuActive = '/';
	  
    $scope.loginWithGoogle = function() {
      var ref = new Firebase("https://vivid-heat-1374.firebaseio.com");
      ref.authWithOAuthRedirect("google", function(error) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          // We'll never get here, as the page will redirect on success.
        }
      });  
      
      return false;    
    };
    
	  $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
       $scope.menuActive = $location.path();
    });
		
	})
  
  .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
