(function () {
    'use strict';
    
    angular
    .module('app.services')
    .service('actuatorService', actuatorService);
    
    actuatorService.$inject = ['$http', 'storageService'];
    
    function actuatorService ($http, storageService) {
        var projects = [];
        var currentProject;
        var endpointsGet = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        var endpointsPost = ['shutdown'];    
        var endpoints = endpointsGet.concat(endpointsPost); 
        var service = {
            'getAllProjects': getAllProjects,
            'addProject': addProject,
            'getProject': getProject,
            'removeProject' : removeProject,
            'setCurrentProject': setCurrentProject,
            'getCurrentProject': getCurrentProject,
            'getEndpoints': getEndpoints
        };

        activate();



        function activate() {
            // Configuration des urls de service
            projects = storageService.getItem('projects');
                
            endpointsGet.forEach(function(endpoint) {
                service[endpoint] = function(url) {
                    return path(url, '/' + endpoint, 'GET');
                }
            });

            endpointsPost.forEach(function(endpoint) {
                service[endpoint] = function(url) {
                    return path(url, '/' + endpoint, 'POST');
                }
            })
        }

        function getAllProjects() {
            return projects;
        }

        function addProject(project) {
            projects.unshift(project);
            storageService.setItem('projects', projects);
            setCurrentProject(project);
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

        function path(url, endpoint, requestMethod) {
            var params = {
               method: requestMethod,
               url: (angular.isUndefined(url) ? currentProject.url : url) + endpoint 
            };

            if(endpoint === '/heapdump') {
                params.responseType = 'arraybuffer';
            }

            return $http(params);
        }

        function getEndpoints() {
            return endpoints;
        }
        
        return service;
    }
})();