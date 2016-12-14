(function () {
    'use strict';
    
    angular
    .module('app.dashboard')
    .config(dashboardRouting);
    
    dashboardRouting.$inject = ['$stateProvider'];
    
    function dashboardRouting($stateProvider) {

        $stateProvider
            .state('dashboard', {
                url: '/',
                views : {
                    '' : {
                        templateUrl : 'app/dashboard/dashboard.html',
                        controller : 'DashboardController',
                        controllerAs: 'vm'
                    },
                    'health@dashboard' : {
                        templateUrl: 'app/health/dashboard/health-dashboard.html',
                        controller: 'HealthDashboardController',
                        controllerAs: 'vm'
                    },
                    'beans@dashboard' : {
                        templateUrl: 'app/beans/dashboard/beans-dashboard.html',
                        controller: 'BeansDashboardController',
                        controllerAs: 'vm'
                    },
                    'env@dashboard' : {
                        templateUrl: 'app/env/dashboard/env-dashboard.html',
                        controller: 'EnvDashboardController',
                        controllerAs: 'vm'
                    },
                    'metrics@dashboard' : {
                        templateUrl: 'app/metrics/dashboard/metrics-dashboard.html',
                        controller: 'MetricsDashboardController',
                        controllerAs: 'vm'
                    },
                    'threads@dashboard': {
                        templateUrl: 'app/threads/dashboard/threads-dashboard.html',
                        controller: 'ThreadsDashboardController',
                        controllerAs: 'vm'
                    },
                    'mappings@dashboard': {
                        templateUrl: 'app/mappings/dashboard/mappings-dashboard.html',
                        controller: 'MappingsDashboardController',
                        controllerAs: 'vm'
                    }
                },
                title: 'DASHBOARD.MODULE_NAME'
            });
    }
})();