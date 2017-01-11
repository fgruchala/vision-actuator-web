(function() {
	'use strict';

	angular
	.module('app.home')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$mdDialog', '$state', 'actuatorService'];

	function HomeController($mdDialog, $state, actuatorService) {
		var vm = this;

		vm.addServicePopup = addServicePopup;
		vm.goToProject = goToProject;
		vm.projects = [];

		activate();



		function activate() {
			vm.projects = actuatorService.getAllProjects();
			// TODO faire les appels vers chacuns des services pour afficher statut et dernier acces
		}

		function addServicePopup() {
            $mdDialog.show({
                controller: 'SaveProjectPopupController',
                controllerAs: 'vm',
                templateUrl: 'app/components/multi-projects/save-project-popup.html',
                clickOutsideToClose: true
            })
            .then(function(project) {
                actuatorService.addProject(project);
				vm.projects.put(project);
            });
		}

		function goToProject(project) {
			actuatorService.setCurrentProject(project);
			$state.go('dashboard');
		}
	}
})();