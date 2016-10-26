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
                    scopesPrepData: scopesPrepData
                }
            });
    }

    beansPrepData.$inject = ['actuatorService', '$location'];
    scopesPrepData.$inject = ['beansPrepData'];


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
     * @name scopesPrepData
     * @desc Designing scopes 
     * @param {Object} [beansPrepData]
     * @return {Object}
     * @memberOf beansRouting
     */
    function scopesPrepData(beansPrepData) {
        var scopes = [];

        angular.forEach(beansPrepData, function(bean, idx) {
            if(scopes.indexOf(bean.scope) == -1){
                scopes.push(bean.scope);
            }
        });

        return scopes;
    }

})();