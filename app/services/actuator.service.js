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

        var service = {};
        var projects = [];
        var currentProject;
        var endpointsGet = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        var endpointsPost = ['shutdown'];    
        var endpoints = endpointsGet.concat(endpointsPost);
        
        
        activate();



        /*
        * Initialisation des endpoints
        */
        function activate() {
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
            });

            service.endpoints = endpoints;
            service.setDefaultProject = setDefaultProject;
            service.getAllProjects = getAllProjects;
            service.setAllProjects = setAllProjects;
            service.addProject = addProject;
            service.setCurrentProject = setCurrentProject;
            service.getCurrentProject = getCurrentProject;
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

        function setAllProjects(projects) {
            storageService.setItem('projects', projects);
        }

        function addProject(project) {
            projects.unshift(project);
            setAllProjects(projects);

            setCurrentProject(project);
        }

        function setCurrentProject(project) {
            currentProject = project;
        }

        function getCurrentProject() {
            return currentProject;
        }

        function path(url, requestMethod) {
            return $http({
               method: requestMethod,
               url: currentProject.url + url 
            });
        }
        
        return service;
    }
})();