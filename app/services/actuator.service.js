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
            // 'endpoints' : ['health', 'beans'],
            'setDefaultProject' : setDefaultProject,
            'getAllProjects' : getAllProjects,
            'setAllProjects' : setAllProjects,
            'addProject' : addProject,
            'setCurrentProject' : setCurrentProject,
            'getCurrentProject' : getCurrentProject
        };
        var projects = [];
        var currentProject;
        service.endpoints = {
            'health' : {autoUpdate:true},
            'beans' : {},
            'env' : {},
            // 'actuator' : {},
            // 'autoconfig' : {},
            // 'configprops' : {},
            // 'dump' : {},
            // 'flyway' : {},
            // 'info' : {},
            // 'liquibase' : {},
            'metrics' : {autoUpdate:true},
            // 'mappings' : {},
            // 'shutdown' : {},
            'trace' : {},
            // 'docs' : {},
            // 'heapdump' : {},
            // 'jolokia' : {},
            // 'logfile' : {}
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
            
            // Configuration des methodes de récupération des données actuator (avec la gestion des auto update)
            for (var key in service.endpoints) {
                service[key] = function(successFn, errorFn) {
					get('/' + key).then(successFn, errorFn);
					if (service.endpoints[key].autoUpdate) {
						$interval(function() {
							get('/' + key).then(successFn, errorFn);
						})
					}
                }
            }
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

        function get(url) {
            return $http({
               method: 'GET',
               url: currentProject.url + url
            });
        }
        
        return service;
    }
})();