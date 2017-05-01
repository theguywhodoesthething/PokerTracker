angular.module('pokerTracker').component('startSession',{
	templateUrl : "app/pokerTracker/startSession/startSession.component.html",
	controller : function(trackerService, $location) {
		var vm = this;
		vm.activeSessions = [];

		vm.startNewSession = function() {
			var newSession = {
				isActive : true,
				startTime : new Date(),
			}

			trackerService.create(newSession).then(function(res){
				$location.path('/active');
			});
		};
	},
	controllerAs : 'vm'
});