/**
 * Created by xiangge on 2017/3/1.
 */

'use strict';
angular.module('app')
  .controller('bookCtrl', ['$scope', "$stateParams", "myHttp", function($scope, $stateParams, myHttp) {
    $scope.searchText = "javascript";
    $scope.query =  $stateParams.id || 'javascript' ;
    $scope.start = 0;
    $scope.count = 30;
    $scope.books = [];

    $scope.loadBooks = function() {
      myHttp.fetch('/api/books', 'GET', {
          'q': $scope.query,
          'count': $scope.count,
          'start': $scope.start
        })
        .then(function(data) {
          $scope.books = data.books;
          $scope.books.total = data.total;
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.start += 20;
        });
    };

    $scope.loadBooks();

    $scope.loadMore = function() {
      myHttp.fetch('/api/books', 'GET', {
          'q': $scope.query,
          'count': $scope.count,
          'start': $scope.start
        })
        .then(function(data) {
          $scope.books = $scope.books.concat(data.books);
          $scope.books.total = data.total;
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.start += 20;
        });
    };

    $scope.toSearchBook = function(search) {
      $scope.query = search;
      $scope.start = 0;
      $scope.loadBooks();
    }
  }]);

