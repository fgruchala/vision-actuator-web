'use strict';

/**
 * config of the trace module
 * @namespace Trace
 * @memberOf App
 */
(function () {

    angular
        .module('app.trace')
        .config(traceConfig);

    traceConfig.$inject = ['$stateProvider'];

    function traceConfig($stateProvider) {

        $stateProvider
            .state('trace', {
                url: '/trace',
                templateUrl: 'app/trace/trace.html',
                controller: 'TraceController',
                controllerAs: 'vm',
                title: 'TRACE.MODULE_NAME',
                resolve: {
                    tracePrepData: tracePrepData
                }
            });
    }

    tracePrepData.$inject = ['actuatorService'];

    function tracePrepData(actuatorService) {
        return actuatorService.trace();
    }
})();