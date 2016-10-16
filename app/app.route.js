/**
 * Global Routing of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(config);
    
    config.$inject = ['$urlRouterProvider'];
    
    /**
     * @name config
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf App
     */
    function config ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
    
})();