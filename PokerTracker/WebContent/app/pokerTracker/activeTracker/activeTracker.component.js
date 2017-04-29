angular.module('pokerTracker').component('activeTracker',{
	templateUrl : "app/pokerTracker/activeTracker/activeTracker.component.html",
	controller : function(trackerService) {
		var vm = this;
		
		vm.isTournament = false;
		vm.activeSessions = [];

        vm.reload = function() {
        	trackerService.index(false).then(function(res){
        		vm.activeSessions = res.data;
        	});
        };
        
        vm.reload();
		
		vm.endSession = function(session){
			session.isActive = false;
			session.endTime = new Date();
			trackerSession.update(session);
			vm.reload();
		};
		
		vm.saveSession = function(session){
			trackerSession.update(session);
			vm.reload();
		};
		
		vm.addNote = function(newNote){
			var session = {
					id: newNote.sessionId,
					note: newNote
			}
			trackerSession.update(session);
			vm.reload();
		};
		
	},
	controllerAs: 'vm'
});