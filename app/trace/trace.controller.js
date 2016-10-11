'use strict';

(function() {

	angular
	.module('app.trace')
	.controller('TraceController', TraceController);

	TraceController.$inject = ['tracePrepData', 'actuatorService'];

	function TraceController(tracePrepData, actuatorService) {
		var vm = this;

		vm.traces = tracePrepData.data;

		vm.colorFromStatus = colorFromStatus;
		vm.filtrer = filtrer;

		function colorFromStatus(status) {
            if (status >= 500) {
                return 'status5xx';
            } else if (status >= 400) {
                return 'status4xx';
            } else {
                return 'status2xx';
            }
        }

		function filtrer() {
			return function(trace) {
				// on cache les traces concernant actuator
				var endpoint = trace.info.path.substring(1, trace.info.path.length);
				if (vm.filterCheckbox && actuatorService.endpoints.indexOf(endpoint) !== -1) {
					return false;
				}

				if (!vm.filterValue) {
					return true;
				}

				// on filtre sur le champ de recherche
				var methodMatch = trace.info.method.indexOf(vm.filterValue) !== -1;
				var pathMatch = trace.info.path.indexOf(vm.filterValue) !== -1;
				var statusMatch = trace.info.headers.response.status.indexOf(vm.filterValue) !== -1;

				return pathMatch || methodMatch || statusMatch;
			}
		}
	}
})();