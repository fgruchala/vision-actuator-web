(function() {
	'use strict';

	angular
	.module('app.trace')
	.controller('TraceController', TraceController);

	TraceController.$inject = ['tracePrepData', 'filtersPrepData', 'actuatorService'];

	function TraceController(tracePrepData, filtersPrepData, actuatorService) {
		var vm = this;

		vm.traces = tracePrepData;
		vm.filtersPrepData = filtersPrepData;
		vm.filtering = {};

		vm.colorFromStatus = colorFromStatus;
		vm.filter = filter;
        vm.selectFilterByKey = selectFilterByKey;
        vm.isFilteringByKey = isFilteringByKey;

		init();

        function init() {
			vm.filtering.value = '';
            vm.filtering.methods = angular.copy(vm.filtersPrepData.methods);
            vm.filtering.status = angular.copy(vm.filtersPrepData.status);
            vm.filtering.other = ['actuator'];
        }

		function colorFromStatus(status) {
            if (status >= 500) {
                return 'status5xx';
            } else if (status >= 400) {
                return 'status4xx';
            } else {
                return 'status2xx';
            }
        }

		function filter() {
			return function(trace) {
				// on cache les traces concernant actuator
				var endpoint = trace.info.path.substring(1, trace.info.path.length);
				if (!isFilteringByKey('other', 'actuator') && actuatorService.endpoints.indexOf(endpoint) !== -1) {
					return false;
				}

				// on filtre sur le champ de recherche
				return trace.info.path.indexOf(vm.filtering.value) !== -1
					&& vm.filtering.methods.indexOf(trace.info.method) !== -1
					&& vm.filtering.status.indexOf(trace.info.headers.response.status) !== -1;
			}
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