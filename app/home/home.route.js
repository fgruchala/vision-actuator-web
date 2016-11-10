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
    
    homeRouting.$inject = ['$stateProvider'];
    
    /**
     * @name homeRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf Home
     */
    function homeRouting ($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                views : {
                    '' : {
                        templateUrl : 'app/home/home.html',
                        controller : 'HomeController',
                        controllerAs: 'vm'
                    },
                    'health@home' : {
                        templateUrl: 'app/health/home/health-home.html',
                        controller: 'HealthHomeController',
                        controllerAs: 'vm'
                    },
                    'beans@home' : {
                        templateUrl: 'app/beans/home/beans-home.html',
                        controller: 'BeansHomeController',
                        controllerAs: 'vm'
                    },
                    'env@home' : {
                        templateUrl: 'app/env/home/env-home.html',
                        controller: 'EnvHomeController',
                        controllerAs: 'vm'
                    }
                },
                title: 'HOME.MODULE_NAME'
            });
    }
})();