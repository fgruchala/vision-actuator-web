(function() {
    'use strict';

    angular
    .module('app.mappings')
    .config(mappingsRouting);

    mappingsRouting.$inject = ['$stateProvider'];

    function mappingsRouting($stateProvider) {
        $stateProvider
        .state('mappings', {
                url: '/mappings',
                templateUrl: 'app/mappings/mappings.html',
                controller: 'MappingsController',
                controllerAs: 'vm',
                title: 'MAPPINGS.MODULE_NAME',
                resolve: {
                    mappingsPrepData: mappingsPrepData
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

    function transformData(mappings) {
        var transformedMappings = [];
        var requestRegex = /{?\[?([/a-z.| *]*)\]?(,methods=\[([A-Z| ]*)\])?(,produces=\[([a-z |/-]*)\])?}?/g;
        var matches;

        angular.forEach(mappings, function(mapping, key) {
            matches = requestRegex.exec(key) || [];
            transformedMappings.push({
                request: {
                    url: matches[1],
                    methods: matches[3],
                    produced: matches[5]
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