(function() {
    'use strict';

    angular
    .module('app.mappings')
    .config(mappingsRouting);

    mappingsRouting.$inject = ['$stateProvider'];

    function mappingsRouting($stateProvider) {
        $stateProvider
        .state('mappings', {
                parent: 'project',
                url: '/mappings',
                templateUrl: 'app/mappings/mappings.html',
                controller: 'MappingsController',
                controllerAs: 'vm',
                title: 'MAPPINGS.MODULE_NAME',
                resolve: {
                    mappingsPrepData: mappingsPrepData,
                    filtersPrepData: filtersPrepData
                }
            });
    }

    mappingsPrepData.$inject = ['actuatorService'];

    function mappingsPrepData(actuatorService) {
        return actuatorService
                .mappings()
                .then(function(response) {
                    return transformData(response.data);
                })
                .catch(function(err) {
                    if(err.status === -1 || err.status === 404) {
                        $location.url('/');
                    }
                    
                    return err.data;
                });
    }

    filtersPrepData.$inject = ['mappingsPrepData'];

    function filtersPrepData(mappingsPrepData) {
        var filters = {};
        filters.methods = [];
        filters.produces = [];

        angular.forEach(mappingsPrepData, function(mapping) {
            angular.forEach(mapping.request.methods, function(method) {
                if(filters.methods.indexOf(method) === -1) {
                    filters.methods.push(method);
                }
            });

            angular.forEach(mapping.request.produces, function(produce) {
                if(filters.produces.indexOf(produce) === -1) {
                    filters.produces.push(produce);
                }
            });
        });

        return filters;
    }

    function transformData(mappings) {
        var transformedMappings = [];
        var requestRegex = /^{?\[?([\/a-z.{}:| *]*)\]?(,methods=\[([A-Z| ]*)\])?(,produces=\[([a-z |\/-]*)\])?}?$/;
        var matches;

        angular.forEach(mappings, function(mapping, key) {
            matches = requestRegex.exec(key) || [];

            transformedMappings.push({
                request: {
                    urls: (matches[1] ? matches[1].split(' || ') : null),
                    methods: (matches[3] ? matches[3].split(' || ') : ['NONE']),
                    produces: (matches[5] ? matches[5].split(' || ') : ['NONE'])
                },
                java: {
                    bean: mapping.bean,
                    method: mapping.method
                } 
            });
        });

        return transformedMappings;
    }

})();