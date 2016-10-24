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
                	beansPrepData: beansPrepData,
                    filtersPrepData: filtersPrepData
                }
            });
    }

    beansPrepData.$inject = ['actuatorService', '$location'];
    filtersPrepData.$inject = [];


    /**
     * @name beansPrepData
     * @desc Retrieve beans via the Actuator WebService 
     * @param {Service} [actuatorService]
     * @param {@link https://docs.angularjs.org/api/ng/service/$location | AngularService} [$location]
     * @return {Object}
     * @memberOf beansRouting
     */
    function beansPrepData(actuatorService, $location) {
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
            });
    }

    /**
     * @name filtersPrepData
     * @desc Designing filters 
     * @param {Object} [beansPrepData]
     * @return {Object}
     * @memberOf beansRouting
     */
    function filtersPrepData() {
        return undefined;
    }

})();