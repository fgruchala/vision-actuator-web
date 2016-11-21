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
    
    actuatorService.$inject = ['$http', '$interval', 'storageService'];
    
    /**
     * @name actuatorService
     * @param {@link https://docs.angularjs.org/api/ng/service/$http | AngularService} [$http]
     * @param {Service} [storageService]
     * @return Array
     * @memberOf Services
     */
    function actuatorService ($http, $interval, storageService) {

        var service = {
            'setDefaultProject' : setDefaultProject,
            'getAllProjects' : getAllProjects,
            'setAllProjects' : setAllProjects,
            'addProject' : addProject,
            'setCurrentProject' : setCurrentProject,
            'getCurrentProject' : getCurrentProject
        };
        var projects = [];
        var currentProject;
        var endpointsGet = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        var endpointsPost = ['shutdown'];    
        var endpoints = endpointsGet.concat(endpointsPost);
                
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
                url: 'http://localhost:9090/'
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
            var params = {
               method: requestMethod,
               url: currentProject.url + url 
            };


            if(url === '/heapdump') {
                params.responseType = 'arraybuffer';
            }

            return $http(params);
        }
        
        return service;
    }
})();