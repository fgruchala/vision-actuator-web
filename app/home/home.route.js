/**
 * Routing of the home module
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
            resolve : {
                tracesData : tracesData
            }
        });
    }

    tracesData.$inject = ['actuatorService'];
    function tracesData(actuatorService) {
        return actuatorService.trace();
    }
})();