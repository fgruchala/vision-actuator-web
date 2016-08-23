/**
 * Routing of the beans module
 * @namespace Beans
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.beans')
    .config(beansRouting);
    
    beansRouting.$inject = ['$routeProvider'];
    
    /**
     * @name beansRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf Beans
     */
    function beansRouting ($routeProvider) {
        $routeProvider.when('/beans', {
            templateUrl: 'app/beans/beans.html',
            controller: 'BeansController',
            controllerAs: 'vm',
            title: 'BEANS.MODULE_NAME',
            resolve: {
                beansPrepData: beansPrepData
            }
        });
    }
    
    beansPrepData.$inject = ['actuatorService'];
    
    
    /**
     * @name beansPrepData
     * @desc Retrieve beans via the Actuator WebService 
     * @param Service actuatorService
     * @return Object
     * @memberOf beansRouting
     */
    function beansPrepData (actuatorService) {
        return actuatorService
        .beans()
        .then(
            function(response) {
                return response.data[0].beans;
            }, 
            function(responseInError) {
                return responseInError.data;
            });
    }
    
})();