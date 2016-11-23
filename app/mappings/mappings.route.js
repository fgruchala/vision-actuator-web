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
                    mappingsPrepData: mappingsPrepData,
                    tagsPrepData: tagsPrepData
                }
            });
    }

    mappingsPrepData.$inject = ['actuatorService'];
    tagsPrepData.$inject = ['mappingsPrepData'];

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

    function tagsPrepData(mappingsPrepData) {

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
                    methods: (matches[3] ? matches[3].split(' || ') : null),
                    produces: (matches[5] ? matches[5].split(' || ') : null)
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