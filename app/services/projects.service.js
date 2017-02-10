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
                project.id = calculNextProjectId();
                projects.unshift(project);
                storageService.setItem('projects', projects);
                return project
            }
        }

        function calculNextProjectId() {
            var projects = getAllProjects();
            var maxId = 0;

            angular.forEach(projects, function(project) {
                (project.id > maxId) ? maxId = project.id : null;
            });
            return maxId+1;
        }

        function removeProject(project) {
            let index = projects.findIndex(function(elem) {
                return elem.id === project.id;
            });
            if (index !== -1) {
                projects.splice(index, 1);
                storageService.setItem('projects', projects);
                return true;
            }
            return false;
        }

        function getProject(projectId) {
             if (angular.isDefined(projects)) {
                return projects.find(function(project) {
                    return project.id == projectId;
                });
            }
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