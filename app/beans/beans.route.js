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

    beansRouting.$inject = ['$stateProvider'];

    /**
     * @name beansRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} [$routeProvider]
     * @memberOf Beans
     */
    function beansRouting($stateProvider) {

        $stateProvider
            .state('beans', {
                url: '/beans',
                templateUrl: 'app/beans/beans.html',
                controller: 'BeansController',
                controllerAs: 'vm',
                title: 'BEANS.MODULE_NAME',
                resolve: {
                	beansPrepData: beansPrepData 
                }
            });
    }

    beansPrepData.$inject = ['actuatorService', '$location', '$mdToast', '$translate'];


    /**
     * @name beansPrepData
     * @desc Retrieve beans via the Actuator WebService 
     * @param {Service} [actuatorService]
     * @param {@link https://docs.angularjs.org/api/ng/service/$location | AngularService} [$location]
     * @param {@link https://material.angularjs.org/latest/api/service/$mdToast | MaterialService} [$mdToast]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} [$translate]
     * @return {Object}
     * @memberOf beansRouting
     */
    function beansPrepData(actuatorService, $location, $mdToast, $translate) {
        return $translate('COMMON.LOADING')
            .then(function (loadingTranslation) {
                var loadingPromise = $mdToast.showSimple(loadingTranslation);

                return actuatorService
                    .beans()
            .then(function(response) {
                return response.data[0].beans;
            })
            .catch(function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    $location.url('/');
                }

                return responseInError.data;
            })
                    .finally(function () {
                        $mdToast.hide(loadingPromise);
                    });
            });
    }

})();