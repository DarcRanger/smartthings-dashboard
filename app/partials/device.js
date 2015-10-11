(function(angular) {
  "use strict";

  angular.module('myApp.device', [])

  .directive('device', function() {
    return {
      restrict: 'E',
      scope: {
        key: '=key',
        device: '=device'
      },
      transclude: true,
      templateUrl: 'partials/device.html',
      controller: function($scope) {
        $scope.deviceId = $scope.device.deviceId;
        $scope.displayName = $scope.device.displayName;
        $scope.deviceType = $scope.device.name;
        $scope.value = $scope.device.value;
        $scope.unit = $scope.device.unit;
        $scope.time = $scope.device.time;
      }
    };
  });


})(angular);

