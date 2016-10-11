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
    
    actuatorService.$inject = ['$http'];
    
    /**
     * @name actuatorService
     * @param {@link https://docs.angularjs.org/api/ng/service/$http | AngularService} $http
     * @return Array
     * @memberOf Services
     */
    function actuatorService ($http) {
   
        var service = {}
        var endpoints = ['health', 'beans', 'env', 'actuator', 'autoconfig', 'configprops', 'dump',
                        'flyway', 'info', 'liquibase', 'metrics', 'mappings', 'shutdown', 'trace',
                        'docs', 'heapdump', 'jolokia', 'logfile'];
        
        activate();

        function activate() {
            // Initialisation des endpoints
            endpoints.forEach(function(endpoint) {
                service[endpoint] = function() {
                    return get('/' + endpoint);
                }
            });

            service.endpoints = endpoints;
        }

        /**
         * @name get
         * @desc Create a HTTP GET request
         * @param String url
         * @return Promise
         * @memberOf actuatorService
         */
        function get(url) {
            return $http({
               method: 'GET',
               url: 'http://localhost:9090' + url 
            });
        }
        
        return service;
    }
})();