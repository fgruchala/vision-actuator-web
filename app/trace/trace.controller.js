(function() {
	'use strict';

	angular
	.module('app.trace')
	.controller('TraceController', TraceController);

	TraceController.$inject = ['$scope', '$timeout', 'actuatorService'];

	function TraceController($scope, $timeout, actuatorService) {
		var vm = this;
		var timeout;
		var REFRESH_EVERY_MILLISECONDS = 30000;

		vm.traces;
		vm.filtersPrepData;
		vm.filtering;
        vm.autoRefreshEnabled = true;

		vm.colorFromStatus = colorFromStatus;
		vm.filter = filter;
        vm.selectFilterByKey = selectFilterByKey;
        vm.isFilteringByKey = isFilteringByKey;
		vm.refreshAuto = refreshAuto;

		init();

        function init() {
			initDatas();
			$scope.$on('$destroy', function() {
				$timeout.cancel(timeout);
			});
        }

		function initDatas() {
			actuatorService
                .trace()
                .then(function(response) {
                    vm.traces = response.data;
					initFilters();
                })
                .catch(function(err) {
                    if(err.status === -1 || err.status === 404) {
                        $location.url('/dashboard');
                    }
                });

            refreshAuto();
		}

		function initFilters() {
			var filters = {};
			filters.methods = [];
			filters.status = [];

			angular.forEach(vm.traces, function(trace) {
				if(filters.methods.indexOf(trace.info.method) === -1) {
					filters.methods.push(trace.info.method);
				}

				if(filters.status.indexOf(trace.info.headers.response.status) === -1) {
					filters.status.push(trace.info.headers.response.status);
				}
			});

			vm.filtersPrepData = {
				methods: filters.methods.sort(),
				status: filters.status.sort()
			};

			if(angular.isDefined(vm.filtering)) {
				vm.filtering = refreshCurrentFilters();
			}
			else {
				vm.filtering = angular.copy(vm.filtersPrepData);
				vm.filtering.value = '';
				vm.filtering.other = ['actuator'];
			} 
		}

		function refreshCurrentFilters() {
			var currentFilters = {};
			currentFilters.methods = [];
			currentFilters.status = [];
			currentFilters.value = angular.copy(vm.filtering.value);
			currentFilters.other = angular.copy(vm.filtering.other);

			angular.forEach(vm.filtering.methods, function(method) {
				if(vm.filtersPrepData.methods.indexOf(method) !== -1) {
					currentFilters.methods.push(method);
				}
			});

            angular.forEach(vm.filtering.status, function(status) {
				if(vm.filtersPrepData.status.indexOf(status) !== -1) {
					currentFilters.status.push(status);
				}
			});

            return currentFilters;
        }

        function refreshAuto(autoRefreshEnabled) {
            vm.autoRefreshEnabled = (angular.isUndefined(autoRefreshEnabled) ? true : !autoRefreshEnabled);

            if(vm.autoRefreshEnabled) {
                timeout = $timeout(initDatas, REFRESH_EVERY_MILLISECONDS);
            }
            else {
                $timeout.cancel(timeout);
            }
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
				if (!isFilteringByKey('other', 'actuator') && actuatorService.getEndpoints().indexOf(endpoint) !== -1) {
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