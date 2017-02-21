(function () {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$mdDialog', '$interval', '$state', '$translate', 'actuatorService', 'projectsService'];

	function HomeController($scope, $mdDialog, $interval, $state, $translate, actuatorService, projectsService) {
		var vm = this;
		var SYNC_MILLISECONDS = 3000;

		vm.addProjectPopup = addProjectPopup;
		vm.removeProjectPopup = removeProjectPopup;
		vm.goToProject = goToProject;
		vm.projects = [];

		activate();



		function activate() {
			$scope.$on('$destroy', $destroy);

			vm.projects = projectsService.getAllProjects();

			if(vm.projects.length === 0) {
				addProjectPopup();
			}
			else {
				angular.forEach(vm.projects, function(project) {
					project.statusCallback = statusSync(project);
					project.lastTraceCallback = lastTraceSync(project);
				});
			}
		}

		function statusSync(project) {
			getStatus(project);
			return $interval(function () {
				getStatus(project);
			}, SYNC_MILLISECONDS);
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

		function lastTraceSync(project) {
			getTrace(project);
			return $interval(function () {
				getTrace(project);
			}, SYNC_MILLISECONDS);
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

		function $destroy() {
			angular.forEach(vm.projects, function (project) {
				cancelCallback(project);
			});
		}

		function cancelCallback(project) {
			if (project) {
				$interval.cancel(project.statusCallback);
				$interval.cancel(project.lastTraceCallback);
			}
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
				project.statusCallback = statusSync(project);
				project.lastTraceCallback = lastTraceSync(project);
				vm.projects.push(project);
			});
		}

		function removeProjectPopup(project) {
			$mdDialog
			.show(
				$mdDialog.confirm()
					.title($translate.instant('HOME.POPUP_DELETE_PROJECT_TITLE'))
					.cancel($translate.instant('COMMON.NO'))
					.ok($translate.instant('COMMON.YES'))
			).then(function () {
				if (projectsService.removeProject(project)) {
					let index = vm.projects.findIndex(function(elem) {
                		return elem.id === project.id;
            		});
            		if (index !== -1) {
						cancelCallback(vm.projects[index]);
                		vm.projects.splice(index, 1);
            		}
					if(vm.projects.length === 0) {
						addProjectPopup();
					}
				}
			});
		}

		function goToProject(project) {
			$state.go('dashboard', { 'projectId': project.id }, { reload: true });
		}
	}
})();