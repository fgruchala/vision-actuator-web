(function () {
    'use strict';
    
    angular
    .module('app.services')
    .service('actuatorService', actuatorService);
    
    actuatorService.$inject = ['$http', 'storageService', 'projectsService'];
    
    function actuatorService ($http, storageService, projectsService) {
        var endpointsGet = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        var endpointsPost = ['shutdown'];    
        var endpoints = endpointsGet.concat(endpointsPost); 
        var service = {
            'getEndpoints': getEndpoints
        };

        activate();



        function activate() {
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

            projects = storageService.getItem('projects');
            projects = [];
            projects.push({
                id: 'localhost',
                name: 'Localhost',
                url: 'http://localhost:9090'
            });

        function path(url, endpoint, requestMethod) {
            let currentProject = projectsService.getCurrentProject();
            let params = {
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