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

        var DEFAULT_URL = 'http://localhost:9090';
   
        var service = {};
        var baseUrl = DEFAULT_URL;
        var endpoints = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'shutdown', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        
        activate();



        /*
        * Initialisation des endpoints
        */
        function activate() {
            endpoints.forEach(function(endpoint) {
                service[endpoint] = function() {
                    return get('/' + endpoint);
                }
            });

            service.endpoints = endpoints;
            service.setServiceUrl = setServiceUrl;
            service.getServiceUrl = getServiceUrl;
        }

        function setServiceUrl(newUrl) {
            baseUrl = newUrl;
        }

        function getServiceUrl() {
            return baseUrl;
        }

        function get(url) {
            return $http({
               method: 'GET',
               url: baseUrl + url 
            });
        }
        
        return service;
    }
})();