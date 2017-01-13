(function() {
	'use strict';

	angular
	.module('app.services')
	.service('projectsService', projectsService);

	projectsService.$inject = ['storageService'];

	function projectsService(storageService) {
		var service = {
			'getAllProjects': getAllProjects,
            'addProject': addProject,
            'getProject': getProject,
            'removeProject' : removeProject,
            'setCurrentProject': setCurrentProject,
            'getCurrentProject': getCurrentProject,
		}

		let projects = [];
		let currentProject;

		activate();



		function activate() {
			getAllProjects();
		}

		function getAllProjects() {
            projects = storageService.getItem('projects');

            if(angular.isUndefined(projects)) {
                projects = [];
            }
            
            return projects;
        }

        function addProject(project) {
            if (project) {
                project.id = project.name;
                projects.unshift(project);
                storageService.setItem('projects', projects);
            }
        }

        function removeProject(project) {
            let index = projects.indexOf(project);
            if (index !== -1) {
                projects.splice(index, 1);
                storageService.setItem('projects', projects);
            }
        }

        function getProject(projectId) {
            var projectFound;

            if(angular.isDefined(projects)) {
                angular.forEach(projects, function(project) {
                    if(project.id === projectId) {
                        projectFound = project;
                        return;
                    }
                });
            }

            return projectFound;
        }

        function setCurrentProject(project) {
            currentProject = project;
        }

        function getCurrentProject() {
            return currentProject;
        }

        return service;
	}
})();