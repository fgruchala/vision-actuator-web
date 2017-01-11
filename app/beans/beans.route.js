(function () {
    'use strict';

    angular
    .module('app.beans')
    .config(beansRouting);

    beansRouting.$inject = ['$stateProvider'];

    function beansRouting($stateProvider) {
        $stateProvider
            .state('beans', {
                parent: 'project',
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