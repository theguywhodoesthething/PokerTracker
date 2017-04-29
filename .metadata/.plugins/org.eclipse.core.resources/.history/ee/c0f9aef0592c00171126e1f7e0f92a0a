angular.module('pokerTracker').factory('trackerService', function($http) {
    var service = {};

    var BASE_URL = 'http://localhost:8080/PokerTracker/rest/sessions/';

    service.index = function() {
        return $http({
            method: 'GET',
            url: BASE_URL
        });
    };

    return service;
});