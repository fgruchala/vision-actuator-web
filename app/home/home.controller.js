(function() {
	'use strict';

	angular
	.module('app.home')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$mdDialog', '$interval', '$state', 'actuatorService', 'projectsService'];

	function HomeController($scope, $mdDialog, $interval, $state, actuatorService, projectsService) {
		var vm = this;
		var syncCallback = [];
		var SYNC_MILLISECONDS = 5000;

		vm.addProjectPopup = addProjectPopup;
		vm.removeProjectPopup = removeProjectPopup;
		vm.goToProject = goToProject;
		vm.projects = [];

		activate();



		function activate() {
			$scope.$on('$destroy', destroy);

			vm.projects = projectsService.getAllProjects();
			angular.forEach(vm.projects, function(project) {
				statusSync(project);
				lastAccessSync(project);
			});
		}

		function statusSync(project) {
			var callback = $interval(function() {
				actuatorService
                .health(project.url)
                .then(function(response) {
                    project.health = response.data.status;
                })
                .catch(function(response) {
                    project.health = 'DOWN';
                });
			}, SYNC_MILLISECONDS);

			syncCallback.push(callback);
		}

		function lastAccessSync(project) {
			var callback = $interval(function() {
				actuatorService
                .trace(project.url)
                .then(function(response) {
					var lastTrace = getLastTrace(response.data);
					if (lastTrace) {
						project.lastTrace = new Date(lastTrace.timestamp);
					}
                });
			}, SYNC_MILLISECONDS);

			syncCallback.push(callback);
		}

		function getLastTrace(traces) {
			var lastTrace = undefined;
			angular.forEach(traces, function(trace) {
				var endpoint = trace.info.path.substring(1, trace.info.path.length);
				if ((actuatorService.getEndpoints().indexOf(endpoint) === -1) && (!lastTrace || trace.timestamp > lastTrace.timestamp)) {
					lastTrace = trace;
				}
			});

			return lastTrace;
		}

		function destroy() {
			angular.forEach(syncCallback, function(callback) {
				$interval.cancel(callback);
			});
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

		function removeProjectPopup(project) {
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