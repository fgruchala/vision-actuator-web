(function() {
    'use strict';

    angular
    .module('app.mappings')
    .controller('MappingsController', mappingsController);

    mappingsController.$inject = ['mappingsPrepData', 'filtersPrepData'];

    function mappingsController(mappingsPrepData, filtersPrepData) {
        var vm = this;

        vm.mappingsPrepData = mappingsPrepData;
        vm.filtersPrepData = filtersPrepData;
        vm.filtering = {};
        
        vm.filter = filter;
        vm.selectFilterByKey = selectFilterByKey;
        vm.isFilteringByKey = isFilteringByKey;

        init();

        function init() {
            vm.filtering.methods = angular.copy(vm.filtersPrepData.methods);
            vm.filtering.produces = angular.copy(vm.filtersPrepData.produces);
        }

        function filter() {
            return function(value) {
                return filterBy(vm.filtering.methods, value.request.methods)
                    && filterBy(vm.filtering.produces, value.request.produces);
            }
        }

        function filterBy(filters, values) {
            for(var idx in values) {
                if(filters.indexOf(values[idx]) === -1) {
                    return false;
                }
            }

            return true;
        }

        function selectFilterByKey(key, value) {
            var idx = vm.filtering[key].indexOf(value);
            
            if(idx === -1) {
                vm.filtering[key].push(value);
            }
            else {
                vm.filtering[key].splice(idx, 1);
            }
        }

        function isFilteringByKey(key, value) {
            return vm.filtering[key].indexOf(value) !== -1;
        }
    }

})();