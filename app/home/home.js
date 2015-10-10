(function(angular) {
  "use strict";

  var app = angular.module('myApp.home', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute', 'myApp.device', 'myApp.deviceHistory']);

  app.controller('HomeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', '$routeParams', 
    function ($scope, fbutil, user, $firebaseObject, FBURL, $routeParams) {
      
    $scope.debugInfo = JSON.stringify($routeParams);
    
    $scope.locations = $firebaseObject(fbutil.ref('locations'));
    $scope.user = user;
    $scope.FBURL = FBURL;
        
    $scope.locationId = $routeParams.location;
    $scope.deviceId = $routeParams.deviceId;
    
    if($scope.locationId) {
      $scope.location = $firebaseObject(fbutil.ref('loc/'+$scope.locationId));
    }
    
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home/:location?/:deviceId?', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
    
    /*$routeProvider.when('/home/:location', {
//      controller: 'DeviceCtrl',
//      templateUrl: 'partials/device.html'
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });  */  
  }]);

})(angular);

