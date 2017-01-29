(function () {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$mdDialog', '$interval', '$state', 'actuatorService', 'projectsService'];

	function HomeController($scope, $mdDialog, $interval, $state, actuatorService, projectsService) {
		var vm = this;
		var syncCallback = [];
		var SYNC_MILLISECONDS = 3000;

		vm.addProjectPopup = addProjectPopup;
		vm.removeProjectPopup = removeProjectPopup;
		vm.goToProject = goToProject;
		vm.projects = [];

		activate();



		function activate() {
			$scope.$on('$destroy', destroy);

			vm.projects = projectsService.getAllProjects();
			angular.forEach(vm.projects, function (project) {
				statusSync(project);
				lastAccessSync(project);
			});
		}

		function statusSync(project) {
			getStatus(project);
			var callback = $interval(function () {
				getStatus(project);
			}, SYNC_MILLISECONDS);
			syncCallback.push(callback);
		}

		function getStatus(project) {
			if (project) {
				actuatorService
					.health(project.url)
					.then(function (response) {
						project.health = response.data.status;
					})
					.catch(function (response) {
						project.health = 'DOWN';
					});
			}
		}

		function lastAccessSync(project) {
			getTrace(project);
			var callback = $interval(function () {
				getTrace(project);
			}, SYNC_MILLISECONDS);
			syncCallback.push(callback);
		}

		function getTrace(project) {
			actuatorService
				.trace(project.url)
				.then(function (response) {
					var lastTrace = getLastTrace(response.data);
					if (lastTrace) {
						project.lastTrace = new Date(lastTrace.timestamp);
					}
				});
		}

		function getLastTrace(traces) {
			var lastTrace = undefined;
			angular.forEach(traces, function (trace) {
				var endpoint = trace.info.path.substring(1, trace.info.path.length);
				if ((actuatorService.getEndpoints().indexOf(endpoint) === -1) && (!lastTrace || trace.timestamp > lastTrace.timestamp)) {
					lastTrace = trace;
				}
			});

			return lastTrace;
		}

		function destroy() {
			angular.forEach(syncCallback, function (callback) {
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
				.then(function (project) {
					project = projectsService.addProject(project);
					vm.projects.push(project);
				});
		}

		function removeProjectPopup(project) {
			$mdDialog.show(
				$mdDialog.confirm()
					.title('Supprimer le projet de la liste ?')
					.cancel('Non')
					.ok('Oui')
			).then(function () {
				if (projectsService.removeProject(project)) {
					let index = vm.projects.findIndex(function(elem) {
                		return elem.id === project.id;
            		});
            		if (index !== -1) {
                		vm.projects.splice(index, 1);
            		}
				}
			});
		}

		function goToProject(project) {
			if (project.health === 'UP') {
				$state.go('dashboard', { 'projectId': project.id });
			}
		}
	}
})();