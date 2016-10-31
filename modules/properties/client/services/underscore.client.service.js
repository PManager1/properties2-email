// Properties service used to communicate Properties REST endpoints
(function() {
    'use strict';

    angular
        .module('properties')
      .factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
      }])
}());
