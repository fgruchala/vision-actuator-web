'use strict';

(function () {
	angular
		.module('app.metrics')
		.controller('MetricsDashboardController', MetricsDashboardController);

	MetricsDashboardController.$inject = ['$rootScope', '$scope', '$interval', 'actuatorService', 'Configurations'];

	function MetricsDashboardController($rootScope, $scope, $interval, actuatorService, Configurations) {
		var vm = this;
        var interval;

		vm.mem = '';
		vm.memFree = '';
		vm.heap = '';
		vm.heapUsed = '';
		vm.httpSession = '';
		vm.httpSessionMax = '';
		vm.uptime = {};
		vm.error = false;
        vm.loading = true;

		vm.memPercent = memPercent;
		vm.heapPercent = heapPercent;

		activate();



		function activate() {
			getDatas();
			onConfigurationChange();
            $rootScope.$on('configurationChange', onConfigurationChange);
            $scope.$on('$destroy', stopInterval);
			$rootScope.$on('serviceUrlChange', getDatas);
		}

		function onConfigurationChange() {
            var autoRefreshEnabled = Configurations.get('metrics');
            if (autoRefreshEnabled) {
               startInterval();
            } else {
                stopInterval();
            }                
        }

        function startInterval() {
            if (!interval) {
                interval = $interval(function () {
                    getDatas();
                }, 2000);
            }
        }

        function stopInterval() {
            $interval.cancel(interval);
            interval = undefined;
        }

		function memPercent() {
			return (vm.mem - vm.memFree) * 100 / vm.mem;
		}

		function heapPercent() {
			return vm.heapUsed * 100 / vm.heap;
		}

		function getDatas() {
			var promise = actuatorService.metrics();
            promise.success(function(data) {
                setMemData(data);
				setHttpSessionData(data);
				setUptimeData(data);
                vm.error = false;
            });
            promise.error(function(data) {
                vm.error = true;
            });
            promise.finally(function() {
                vm.loading = false;
            });
		}

		function setMemData(metrics) {
			vm.mem = parseInt(metrics['mem']) / 1024 | 0;
			vm.memFree = parseInt(metrics['mem.free']) / 1024 | 0;
			vm.heapUsed = parseInt(metrics['heap.used']) / 1024 | 0;
			vm.heap = parseInt(metrics['heap']) / 1024 | 0;
		}

		function setHttpSessionData(metrics) {
			vm.httpSession = metrics['httpsessions.active'];
			vm.httpSessionMax = metrics['httpsessions.max'];
			if (vm.httpSessionMax === -1) {
				vm.httpSessionMax = '∞';
			}
		}

		function setUptimeData(metrics) {
			var uptimeMoment = moment.duration(metrics['uptime']);
			vm.uptime.days = uptimeMoment.asDays() | 0;
			uptimeMoment.subtract(vm.uptime.days, 'd');
			vm.uptime.hours = uptimeMoment.asHours() | 0;
			uptimeMoment.subtract(vm.uptime.hours, 'h');
			vm.uptime.minutes = uptimeMoment.asMinutes() | 0;
			uptimeMoment.subtract(vm.uptime.minutes, 'm');
			vm.uptime.second = uptimeMoment.asSeconds() | 0;
		}
	}
})();