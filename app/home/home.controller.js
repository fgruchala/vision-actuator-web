(function() {
	'use strict';

	angular
	.module('app.home')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$mdDialog', '$state', 'actuatorService'];

	function HomeController($mdDialog, $state, actuatorService) {
		var vm = this;

		vm.addProjectPopup = addProjectPopup;
		vm.deleteProject = deleteProject;
		vm.goToProject = goToProject;
		vm.projects = [];

		activate();



		function activate() {
			vm.projects = actuatorService.getAllProjects();
			// TODO faire les appels vers chacuns des services pour afficher statut et dernier acces
		}

		function addProjectPopup() {
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

		function deleteProject(event, project) {
			debugger;
			$mdDialog.show(
      			$mdDialog.alert()
        		.title('Supprimer un projet de la liste')
        		.textContent('Êtes vous certain de vouloir supprimer ce projet de la liste ?')
        		.ok('Oui !')
				.targetEvent(event)
			)
			.then(function() {
				actuatorService.removeProject(project);
			});
		}

		function goToProject(project) {
			actuatorService.setCurrentProject(project);
			$state.go('dashboard');
		}
	}
})();