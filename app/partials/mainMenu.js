(function(angular) {
  "use strict";

  angular.module('myApp.mainMenu', [])

  .directive('mainmenu', function() {
    return {
      restrict: 'E',
      scope: {
      },
      transclude: true,
      templateUrl: 'partials/mainMenu.html',
      controller: function($scope, $rootScope, $location) {

    	  $scope.menu = [
    	    {label:'Home', route:'#/home'},
    	    {label:'LCARS', route:'#/lcars'},
          {label:'Account', route:'#/account'}
    	   ]

    	  $scope.menuActive = '/';

    	  $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
           $scope.menuActive = $location.path();
        });

    	}
    };
  });


})(angular);

