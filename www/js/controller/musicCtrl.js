/**
 * Created by xiangge on 2017/3/2.
 */

'use strict';
angular.module('app')
  .controller('musicCtrl', ['$scope', "$stateParams", "myHttp", function($scope, $stateParams, myHttp) {
    $scope.musicUrl = "";
    $scope.type = 'search';
    $scope.query = $scope.q || 'fade';
    $scope.count = 20;
    $scope.start = 0;
    $scope.br = null;
    $scope.id = null;
    $scope.search_type = null;

    $scope.loadMusic = function() {
      myHttp.fetch('/api/music', 'GET', {
        type: $scope.type,
        s: $scope.query,
        count: $scope.count,
        start: $scope.start,
        br: $scope.br,
        id: $scope.id,
        search_type: $scope.search_type
      }).then(function(data) {
        $scope.musicDetail = data.result.songs;
        $scope.musicDetail.total = data.result.songCount;
        $scope.start += 20;
      });
    };

    $scope.loadMusic();

    $scope.loadMore = function() {
      myHttp.fetch('/api/music', 'GET', {
        type: $scope.type,
        s: $scope.query,
        count: $scope.count,
        start: $scope.start,
        br: $scope.br,
        id: $scope.id,
        search_type: $scope.search_type
      }).then(function(data) {
        $scope.musicDetail = $scope.musicDetail.concat(data.result.songs);
        $scope.musicDetail.total = data.result.songCount;
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.start += 20;
      });

    };


    $scope.play = function(id) {
      myHttp.fetch('/api/music', 'GET', {'type': 'song', 'id': id})
        .then(function(data) {
          $scope.musicUrl = data.data[0].url;
        })
    };

    $scope.toSearchMusic = function(search) {
      $scope.query = search;
      $scope.start = 0;
      $scope.loadMusic();
    }

  }]);
