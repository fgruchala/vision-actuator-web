(function () {
    'use strict';
    
    angular
    .module('app.env')
    .config(envRouting);
    
    envRouting.$inject = ['$stateProvider'];
    
    function envRouting ($stateProvider) {

        $stateProvider
            .state('env', {
                parent: 'project',
                url: '/env',
                templateUrl: 'app/env/env.html',
                controller: 'EnvController',
                controllerAs: 'vm',
                title: 'ENV.MODULE_NAME',
                resolve: {
                    envPrepData: envPrepData
                }
            });
    }
    
    envPrepData.$inject = ['actuatorService', '$location', '$mdToast', '$translate'];
    
    function envPrepData (actuatorService, $location, $mdToast, $translate) {
        return actuatorService
            .env()
            .then(
                function(response) {
                    return response.data;
                }, 
                function(responseInError) {
                    if(responseInError.status === -1 || responseInError.status === 404) {
                        $location.url('/');
                    }
                    
                    return responseInError.data;
                });
    }
    
})();