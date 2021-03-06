angular.module('appModule', [ 'pokerTracker', 'ngRoute' ]).config(
		function($routeProvider) {
			$routeProvider.when('/', {
				template : '<start-session></start-session>'
			}).when('/summary', {
				template : '<summary-tracker></summary-tracker>'
			}).when('/active', {
				template : '<active-tracker></active-tracker>'
			}).when('/edit/:id', {
				template : '<edit-session></edit-session>'
			}).when('/show/:id', {
				template : '<session-tracker></session-tracker>'
			}).otherwise({
				template : '<error></error>'
			})
		});