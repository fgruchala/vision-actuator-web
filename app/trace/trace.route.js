(function () {
    'use strict';

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
                    tracePrepData: tracePrepData,
                    filtersPrepData: filtersPrepData
                }
            });
    }

    tracePrepData.$inject = ['actuatorService'];
    filtersPrepData.$inject = ['tracePrepData'];

    function tracePrepData(actuatorService) {
        return actuatorService
                .trace()
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    if(err.status === -1 || err.status === 404) {
                        $location.url('/');
                    }
                    
                    return err.data;
                });
    }

    function filtersPrepData(tracePrepData) {
        var filters = {};
        filters.methods = [];
        filters.status = [];

        angular.forEach(tracePrepData, function(trace) {
            if(filters.methods.indexOf(trace.info.method) === -1) {
                filters.methods.push(trace.info.method);
            }

            if(filters.status.indexOf(trace.info.headers.response.status) === -1) {
                filters.status.push(trace.info.headers.response.status);
            }
        });

        return filters;
    }

})();