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
        var items = [];
        
        var services = {
            'actuator': function() {
                return get('/actuator');
            },
            'autoconfig': function() {
                return get('/autoconfig');
            },
            'beans': function() {
                return get('/beans');
            },
            'configprops': function() {
                return get('/configprops');
            },
            'dump': function() {
                return get('/dump');
            },
            'env': function() {
                return get('/env');
            },
            'flyway': function() {
                return get('/flyway');
            },
            'health': function() {
                return get('/health');
            },
            'info': function() {
                return get('/info');
            },
            'liquibase': function() {
                return get('/liquibase');
            },
            'metrics': function() {
                return get('/metrics');
            },
            'mappings': function() {
                return get('/mappings');
            },
            'shutdown': function() {
                return get('/shutdown');
            },
            'trace': function() {
                return get('/flyway');
            },
            'docs': function() {
                return get('/docs');
            },
            'heapdump': function() {
                return get('/heapdump');
            },
            'jolokia': function() {
                return get('/jolokia');
            },
            'logfile': function() {
                return get('/logfile');
            }
        };
        
        
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
        
        return services;
    }
    
})();