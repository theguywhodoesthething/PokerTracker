angular.module('pokerTracker').component('sessionTracker',{
	templateUrl : "app/pokerTracker/sessionTracker/sessionTracker.component.html",
	controller : function(trackerService, $filter) {
		var vm = this;
		vm.activeSessions = [];

		vm.startNewSession = function() {
			var newSession = {
				isActive : true,
				startTime : new Date(),
			}

			trackerService.create(newSession);
		};

		vm.showActive = function() {
			trackerService.index(false).then(function(res) {

				vm.activeSessions = res.data;
			});
		};

	},
	controllerAs : 'vm'
});