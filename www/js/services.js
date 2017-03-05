"use strict";
angular.module("app")
  /**
   * http请求封装
   */
  .factory("myHttp", ["$http", "$q", function($http, $q) {
    var factory = {};
    factory.fetch = function(endpoint, method, params, headers) {
      var defer = $q.defer();
      if (method == 'GET') {
        $http({
          url: endpoint,
          method: "GET",
          params: params,
          headers: headers
        }).success(function (data) {
          defer.resolve(data);
        }).
        error(function (data, status, headers, config) {
          // defer.resolve(data);
          defer.reject(data);
        });
      } else {
        $http({
          url: endpoint,
          method: method,
          headers: headers,
          data: params
        }).success(function (data) {
          defer.resolve(data);
        }).
        error(function (data, status, headers, config) {
          // defer.resolve(data);
          defer.reject(data);
        });
      }
      return defer.promise;
    };
    return factory;
  }]);
