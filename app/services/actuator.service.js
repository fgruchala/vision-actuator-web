/**
 * Service to manage the Actuator WebServices
 * @see {@link http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#production-ready}
 * @namespace Services
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.services')
    .service('actuatorService', actuatorService);
    
    actuatorService.$inject = ['$http', 'storageService'];
    
    /**
     * @name actuatorService
     * @param {@link https://docs.angularjs.org/api/ng/service/$http | AngularService} [$http]
     * @param {Service} [storageService]
     * @return Array
     * @memberOf Services
     */
    function actuatorService ($http, storageService) {
        var projects = [];
        var currentProject;
        var endpointsGet = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        var endpointsPost = ['shutdown'];    
        var endpoints = endpointsGet.concat(endpointsPost); 
        var service = {
            'setDefaultProject' : setDefaultProject,
            'getAllProjects' : getAllProjects,
            'addProject' : addProject,
            'removeProject' : removeProject,
            'setCurrentProject' : setCurrentProject,
            'getCurrentProject' : getCurrentProject,
            'getEndpoints': getEndpoints
        };

        activate();



        function activate() {
            // Configuration des urls de service
            if(angular.isDefined(storageService.getItem('projects'))) {
                projects = storageService.getItem('projects');
                currentProject = projects[0];
            }
            else{
                setDefaultProject();
            }

            endpointsGet.forEach(function(endpoint) {
                service[endpoint] = function() {
                    return path('/' + endpoint, 'GET');
                }
            });

            endpointsPost.forEach(function(endpoint) {
                service[endpoint] = function() {
                    return path('/' + endpoint, 'POST');
                }
            })
        }

        function setDefaultProject() {
            currentProject = {
                name: 'Localhost',
                url: 'http://localhost:9090'
            }
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
            }
        }

        function setCurrentProject(project) {
            currentProject = project;
        }

        function getCurrentProject() {
            return currentProject;
        }

        function path(url, requestMethod) {
            var params = {
               method: requestMethod,
               url: currentProject.url + url 
            };


            if(url === '/heapdump') {
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