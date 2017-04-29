angular.module('pokerTracker').factory('trackerService', function($http) {
    var service = {};

    var BASE_URL = 'http://localhost:8080/PokerTracker/rest/sessions';

    service.index = function(active) {
        return $http({
            method: 'GET',
            url: BASE_URL + "/active/" + active
        });
    };

    service.create = function(session) {
        return $http({
            method: 'POST',
            url: BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: session
        });
    };

    return service;
});