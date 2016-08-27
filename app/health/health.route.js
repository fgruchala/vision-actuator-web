/**
 * Routing of the health module
 * @namespace Health
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.health')
    .config(healthRouting);
    
    healthRouting.$inject = ['$routeProvider'];
    
    /**
     * @name healthRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf Health
     */
    function healthRouting ($routeProvider) {
        $routeProvider.when('/health', {
            templateUrl: 'app/health/health.html',
            controller: 'HealthController',
            controllerAs: 'vm',
            title: 'HEALTH.MODULE_NAME',
            resolve: {
                healthPrepData: healthPrepData
            }
        });
    }
    
    healthPrepData.$inject = ['actuatorService', '$location', '$mdToast', '$translate'];
    
    
    /**
     * @name healthPrepData
     * @desc Retrieve health status via the Actuator WebService 
     * @param Service actuatorService
     * @param {@link https://docs.angularjs.org/api/ng/service/$location | AngularService} $location
     * @param {@link https://material.angularjs.org/latest/api/service/$mdToast | MaterialService} $mdToast
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} $translate
     * @return Object
     * @memberOf healthRouting
     */
    function healthPrepData (actuatorService, $location, $mdToast, $translate) {
        return $translate('COMMON.LOADING')
        .then(function(loadingTranslation) { 
            var loadingPromise = $mdToast.showSimple(loadingTranslation);
            
            return actuatorService
            .health()
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