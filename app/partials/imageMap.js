(function(angular) {
  "use strict";

  angular.module('myApp.imageMap', [])

  .directive('imagemap', function() {
    return {
      restrict: 'E',
      scope: {
        config: '=config',
        allDevices: '=allDevices'
      },
      transclude: true,
      templateUrl: 'partials/imageMap.html',
      controller: function($scope) {
        $scope.getTilePosition = function(tile) {
          var style = { position: 'absolute' };

          if(tile.top) {
            style.top = (tile.top * 100) + '%';
          }

          if(tile.right) {
            style.right = (tile.right * 100) + '%';
          }

          if(tile.bottom) {
            style.bottom = (tile.bottom * 100) + '%';
          }

          if(tile.left) {
            style.left = (tile.left * 100) + '%';
          }

          // console.log(style);
          return style;
        };
      }
    };
  });


})(angular);

