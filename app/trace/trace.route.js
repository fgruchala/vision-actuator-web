'use strict';

/**
 * config of the trace module
 * @namespace Trace
 * @memberOf App
 */
(function() {

    angular
    .module('app.trace')
    .config(traceConfig);

    traceConfig.$inject = ['$routeProvider'];

    function traceConfig($routeProvider) {
        $routeProvider.when('/trace', {
            templateUrl: 'app/trace/trace.html',
            controller: 'TraceController',
            controllerAs: 'vm',
            title: 'HEALTH.MODULE_NAME',
            resolve : {
                tracePrepData : tracePrepData
            }
        });
    }

    tracePrepData.$inject = ['actuatorService'];

    function tracePrepData(actuatorService) {
        return actuatorService.trace();
    }
})();