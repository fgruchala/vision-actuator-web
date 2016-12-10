(function () {
    'use strict';
    
    angular
    .module('app.health')
    .config(healthRouting);
    
    healthRouting.$inject = ['$stateProvider'];
    
    function healthRouting ($stateProvider) {

        $stateProvider
            .state('health', {
                url: '/health',
                templateUrl: 'app/health/health.html',
                controller: 'HealthController',
                controllerAs: 'vm',
                title: 'HEALTH.MODULE_NAME',
                resolve: {
                    healthPrepData: healthPrepData
                }
            });
    }
    
    healthPrepData.$inject = ['actuatorService', '$location'];
    
    function healthPrepData (actuatorService, $location) {
        return actuatorService
                .health()
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    if(err.status === -1 || err.status === 404) {
                        $location.url('/');
                    }
                    
                    return err.data;
                });
    }
    
})();