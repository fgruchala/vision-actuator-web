/**
 * Routing of the health module
 * @namespace Health
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.health')
    .config(healthRouting);
    
    healthRouting.$inject = ['$routeProvider'];
    
    /**
     * @name healthRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf Health
     */
    function healthRouting ($routeProvider) {
        $routeProvider.when('/health', {
            templateUrl: 'app/health/health.html',
            controller: 'HealthController',
            controllerAs: 'vm',
            title: 'HEALTH.MODULE_NAME',
            resolve: {
                healthPrepData: healthPrepData
            }
        });
    }
    
    healthPrepData.$inject = ['actuatorService'];
    
    
    /**
     * @name healthPrepData
     * @desc Retrieve health status via the Actuator WebService 
     * @param Service actuatorService
     * @return Object
     * @memberOf healthRouting
     */
    function healthPrepData (actuatorService) {
        return actuatorService
        .health()
        .then(
            function(response) {
                return response.data;
            }, 
            function(responseInError) {
                return responseInError.data;
            });
    }
    
})();