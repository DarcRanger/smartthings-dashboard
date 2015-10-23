(function(angular) {
  "use strict";

  var controllerNumber = 0;

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
        $scope.number = controllerNumber++;

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
  })

  .directive('scaleToBackground', function ($window, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.machineState = 'init';

        scope.runStateMachine = function () {
console.log(scope.machineState);
          switch (scope.machineState) {
            case 'init':
              // get the image url
              var url = element.css('background-image');
              if(!url || url === 'none') {
                $timeout(scope.runStateMachine, 100);
                return;
              }

              url = url.replace(/"/g,"").replace(/url\(|\)$/ig, "");
              if(!url || /[%{]/.test(url)) {
                $timeout(scope.runStateMachine, 100);
                return;
              }

              // load the image
              scope.img =new Image();
              scope.img.src = url;
              scope.machineState = 'load';
              $timeout(scope.runStateMachine, 100);
              break;

            case 'load':
              if(!scope.img || !scope.img.complete) {
                $timeout(scope.runStateMachine, 100);
              }

              // get image size & ratios
              scope.imgHeight = scope.img.naturalHeight;
              scope.imgWidth = scope.img.naturalWidth;
              scope.imgHeightToWidth = 1 / scope.imgHeight * scope.imgWidth;
              scope.imgWidthToHeight = 1 / scope.imgWidth * scope.imgHeight;

              scope.machineState = 'resize';
              scope.img = null;
              $timeout(scope.runStateMachine, 100);
              // I can't seem to find the right event to know when initial sizing is complete
              // HACK to force resizing
              $timeout(scope.runStateMachine, 1000);
              $timeout(scope.runStateMachine, 5000);
              break;

            case 'resize':
              switch (attrs.scaleToBackground) {
                case 'width':
                  var w = element.height() * scope.imgHeightToWidth;
                  element.css('width', w + 'px');
                  break;

                case 'height':
                  var h = element.width() * scope.imgWidthToHeight;
                  element.css('height', h + 'px');
                  break;

                default:
                  throw 'Unknown attribute value: ' + scope.machineState;
              }
              break;

            default:
              throw 'Unknown machineState: ' + scope.machineState;
          }
        };

        scope.runStateMachine();
        angular.element($window).bind('load resize', scope.runStateMachine);
      }
    };
  })
  ;


})(angular);

