/**
 * Created by xiangge on 2017/3/1.
 */

'use strict';

angular.module('app')
  .directive('appSearch', [function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        search: '=',
        placehold: '@',
        runSearch: '&'
      },
      templateUrl: 'templates/tpls/search.html',
      link: function($scope) {
        $scope.searchClick = function(search) {
          if ($scope.search) {
            $scope.runSearch({search: search})
          }
        }
      }
    }
  }]);
