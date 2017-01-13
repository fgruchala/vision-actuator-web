(function() {
	'use strict';

	angular
	.module('app.home')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$mdDialog', '$state', 'projectsService'];

	function HomeController($mdDialog, $state, projectsService) {
		var vm = this;

		vm.addProjectPopup = addProjectPopup;
		vm.removeProject = removeProject;
		vm.goToProject = goToProject;
		vm.projects = [];

		activate();



		function activate() {
			vm.projects = projectsService.getAllProjects();
			// TODO faire les appels vers chacuns des services pour afficher statut et dernier acces
		}

		function addProjectPopup() {
            $mdDialog.show({
                controller: 'SaveProjectPopupController',
                controllerAs: 'vm',
                templateUrl: '/app/home/add-project-popup.html',
                clickOutsideToClose: true
            })
            .then(function(project) {
                projectsService.addProject(project);
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
				projectsService.removeProject(project);
			});
		}

		function goToProject(project) {
			$state.go('dashboard', {'projectId' : project.id});
		}
	}
})();