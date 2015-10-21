(function(angular) {
  "use strict";

  var app = angular.module('myApp.themes.lcars', ['firebase', 'firebase.utils', 'ngRoute', 'door3.css', 'multi-transclude',
  'myApp.mainMenu', 'myApp.device', 'myApp.deviceHistory']);

  app.controller('LcarsThemeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', '$routeParams', '$timeout',
    function ($scope, fbutil, user, $firebaseObject, FBURL, $routeParams, $timeout) {

    // HACK: For some reason Chrome doesn't apply "height: 100%" to the table contents until something changes the display or size attributes
    $timeout(function() {
      $scope.hackDelayShow = true;
    }, 1000);

    $scope.debugInfo = $routeParams;

    $scope.locations = $firebaseObject(fbutil.ref('locations'));
    $scope.user = user;
    $scope.FBURL = FBURL;

    $scope.locationId = $routeParams.location;
    $scope.deviceKey = $routeParams.deviceKey;

    if($scope.locationId) {
      $scope.location = $firebaseObject(fbutil.ref('loc/'+$scope.locationId));
    }

    if($scope.deviceKey) {
      $scope.deviceHistory = $firebaseObject(fbutil.ref('loc/' + $scope.locationId + '/history/' + $scope.deviceKey));
    }

  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/lcars/:location?/:deviceKey?', {
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

