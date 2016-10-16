/**
 * Routing of the env module
 * @namespace Env
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.env')
    .config(envRouting);
    
    envRouting.$inject = ['$stateProvider'];
    
    /**
     * @name envRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} [$routeProvider]
     * @memberOf Env
     */
    function envRouting ($stateProvider) {

        $stateProvider
            .state('env', {
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
    
    
    /**
     * @name envPrepData
     * @desc Retrieve env via the Actuator WebService 
     * @param {Service} [actuatorService] - Rest client for Actuator
     * @param {@link https://docs.angularjs.org/api/ng/service/$location | AngularService} [$location]
     * @param {@link https://material.angularjs.org/latest/api/service/$mdToast | MaterialService} [$mdToast]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} [$translate]
     * @returns {Object}
     * @memberOf envRouting
     */
    function envPrepData (actuatorService, $location, $mdToast, $translate) {
        return $translate('COMMON.LOADING')
        .then(function(loadingTranslation) { 
            var loadingPromise = $mdToast.showSimple(loadingTranslation);
        
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
                })
            .finally(function() {
                $mdToast.hide(loadingPromise);
            });
        });
    }
    
})();