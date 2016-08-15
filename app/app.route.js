/**
 * Global Routing of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(globalRouting);
    
    globalRouting.$inject = ['$routeProvider'];
    
    /**
     * @name globalRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf App
     */
    function globalRouting ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
    
})();