'use strict';

(function () {
	angular
		.module('app.metrics')
		.controller('MetricsDashboardController', MetricsDashboardController);

	MetricsDashboardController.$inject = ['$rootScope', '$scope', '$timeout', 'actuatorService'];

	function MetricsDashboardController($rootScope, $scope, $timeout, actuatorService) {
		var vm = this;
		var timeout;
        var REFRESH_EVERY_MILLISECONDS = 15000;

		vm.mem;
		vm.memFree;
		vm.heap;
		vm.heapUsed;
		vm.httpSession;
		vm.httpSessionMax;
		vm.uptime;
		vm.error = false;

		vm.memPercent = memPercent;
		vm.heapPercent = heapPercent;

		activate();

		function activate() {
			getDatas();
			$scope.$on('$destroy', function() {
				$timeout.cancel(timeout);
			});
			$rootScope.$on('serviceUrlChange', getDatas);
		}

		function memPercent() {
			return (vm.mem - vm.memFree) * 100 / vm.mem;
		}

		function heapPercent() {
			return vm.heapUsed * 100 / vm.heap;
		}

		function getDatas() {
			vm.error = false;
			
			actuatorService
				.metrics()
            	.then(function(response) {
					setMemData(response.data);
					setHttpSessionData(response.data);
					setUptimeData(response.data);
            	})
				.catch(function(response) {
					vm.error = true;
				});

			timeout = $timeout(getDatas, REFRESH_EVERY_MILLISECONDS);
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
			vm.uptime = {};

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