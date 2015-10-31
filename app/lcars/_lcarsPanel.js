(function(angular) {
  "use strict";

  var controllerNumber = 0;

  angular.module('myApp.lcarsPanel', [])

  .directive('lcarsPanel', function() {
    return {
      restrict: 'E',
      scope: {
        leftMenu: '=',
        title: '=',
        titleClick: '&',
        titleSymbol: '='
      },
      transclude: true,
      templateUrl: 'lcars/_lcarsPanel.html',
      controller: function($scope) {
        $scope.test = function() {
          $scope.titleClick();
          console.log($scope);
        }
      }
    };
  })

  ;


})(angular);

