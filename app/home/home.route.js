/**
 * Routing of the Home module
 * @namespace Home
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.home')
    .config(homeRouting);
    
    homeRouting.$inject = ['$routeProvider'];
    
    /**
     * @name homeRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf Home
     */
    function homeRouting ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            title: 'HOME.MODULE_NAME',
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
     * @memberOf homeRouting
     */
    function healthPrepData (actuatorService) {
        return actuatorService
        .health()
        .then(
            function(response) {
                return response.data.status;
            }, 
            function(err) {
                return undefined;
            });
    }
    
})();