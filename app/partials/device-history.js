(function(angular) {
  "use strict";

  angular.module('myApp.deviceHistory', ['angularMoment'])
  
  .directive('deviceHistory', function() {
    return {
      restrict: 'E',
      scope: {
        deviceKey: '=deviceKey',
        locationKey: '=locationKey'
      },
      templateUrl: 'partials/device-history.html',
      controller: function($scope, $firebaseObject, fbutil) {
        $scope.$watch('deviceKey', function(newValue, oldValue) {
          var path = 'loc/' + $scope.locationKey + '/history/' + $scope.deviceKey;
          $scope.loc = path;
          $scope.history = $firebaseObject(fbutil.ref(path));
        });
      }
    };
  });


})(angular);

