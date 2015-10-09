(function(angular) {
  "use strict";

  var app = angular.module('myApp.themes.lcars', ['firebase', 'firebase.utils', 'ngRoute', 'door3.css', 'myApp.device', 'myApp.deviceHistory']);

  app.controller('LcarsThemeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', '$location', 
    function ($scope, fbutil, user, $firebaseObject, FBURL, $location) {
      
    $scope.locations = $firebaseObject(fbutil.ref('locations'));
    $scope.user = user;
    $scope.FBURL = FBURL;
        
    $scope.locationId = $location.search().loc;
    
    if($scope.locationId) {
      $scope.location = $firebaseObject(fbutil.ref('loc/'+$scope.locationId));
    }
    
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/lcars', {
      templateUrl: 'lcars/theme.html',
      css: 'lcars/theme.css',
      controller: 'LcarsThemeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
      
  }]);

})(angular);

