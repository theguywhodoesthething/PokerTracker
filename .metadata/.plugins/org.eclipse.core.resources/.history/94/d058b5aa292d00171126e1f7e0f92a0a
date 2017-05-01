angular.module('appModule', [ 'pokerTracker', 'ngRoute' ]).config(
		function($routeProvider) {
			$routeProvider.when('/', {
				template : '<session-tracker></session-tracker>'
			}).when('/summary', {
				template : '<summary-tracker></summary-tracker>'
			}).when('/active', {
				template : '<active-tracker></active-tracker>'
			}).otherwise({
				template : '<error></error>'
			})
		});