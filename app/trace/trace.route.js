(function () {
    'use strict';

    angular
    .module('app.trace')
    .config(traceConfig);

    traceConfig.$inject = ['$stateProvider'];

    function traceConfig($stateProvider) {
        $stateProvider
            .state('trace', {
                parent: 'project',
                url: '/trace',
                templateUrl: 'app/trace/trace.html',
                controller: 'TraceController',
                controllerAs: 'vm',
                title: 'TRACE.MODULE_NAME'
            });
    }

})();