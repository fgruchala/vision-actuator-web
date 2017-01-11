(function() {
	'use strict';

	angular
	.module('app.home')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$mdDialog', '$state', 'actuatorService'];

	function HomeController($mdDialog, $state, actuatorService) {
		var vm = this;

		vm.addProjectPopup = addProjectPopup;
		vm.removeProject = removeProject;
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
            });
		}

		function removeProject(project) {
			$mdDialog.show(
      			$mdDialog.confirm()
        		.title('Supprimer le projet de la liste ?')
				.cancel('Non')
				.ok('Oui')
			)
			.then(function() {
				actuatorService.removeProject(project);
			});
		}

		function goToProject(project) {
			$state.go('dashboard', {'projectId' : project.id});
		}
	}
})();