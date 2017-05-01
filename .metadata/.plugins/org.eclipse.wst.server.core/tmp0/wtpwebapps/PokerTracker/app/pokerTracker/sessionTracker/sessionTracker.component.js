angular.module('pokerTracker').component('sessionTracker',{
	templateUrl : "app/pokerTracker/sessionTracker/sessionTracker.component.html",
	controller : function(trackerService, $location, $routeParams) {
		var vm = this;
		
		vm.isTournament = false;
		vm.session = {};

        vm.reload = function() {
        	trackerService.show($routeParams.id).then(function(res){
        		vm.session = res.data;
	        	if(vm.session.tournament !== null){
	        		vm.isTournament = true;
	        	};
        	});
        };
        
        vm.reload();
        
        vm.getTotalTimePlayed = function(){
        	var time = (new Date(vm.session.endTime) - new Date(vm.session.startTime))/60000;
        	
        	var minutes = parseInt(time%60);
        	var hours = parseInt(time/60);
        	
        	return hours + " hrs "  + minutes + " mins";
        }
        
        vm.getProfitPerHour = function(){
        	var time = (new Date(vm.session.endTime) - new Date(vm.session.startTime))/60000;
        	return (vm.session.cashOut - vm.session.buyIn)/(time/60);
        }
        
        vm.editSession = function(){
        	$location.path('/edit/' + $routeParams.id);
        };
		
	},
	controllerAs: 'vm'
});