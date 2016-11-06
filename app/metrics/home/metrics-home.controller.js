'use strict';

(function () {
    angular
    .module('app.metrics')
    .controller('MetricsHomeController', MetricsHomeController);
    
    MetricsHomeController.$inject = ['$rootScope', 'actuatorService'];
    
    function MetricsHomeController($rootScope, actuatorService) {
        var vm = this;

        vm.mem;
		vm.memFree;
		vm.heap;
		vm.heapUsed;
		vm.uptime = {};

		vm.memPercent = memPercent;
		vm.heapPercent = heapPercent;

        activate();



        function activate() {
            getDatas();
			$rootScope.$on('serviceUrlChange', getDatas);
		}

		function getDatas() {
			actuatorService.metrics()
				.then(function (metrics) {
					vm.mem = parseInt(metrics.data['mem']) / 1024 | 0;
					vm.memFree = parseInt(metrics.data['mem.free']) / 1024 | 0;
					vm.heapUsed = parseInt(metrics.data['heap.used']) / 1024 | 0;
					vm.heap = parseInt(metrics.data['heap']) / 1024 | 0;

					var uptimeMoment = moment.duration(metrics.data['uptime']);
					vm.uptime.days = uptimeMoment.asDays() | 0;
					uptimeMoment.subtract(vm.uptime.days, 'd');
					vm.uptime.hours = uptimeMoment.asHours() | 0;
					uptimeMoment.subtract(vm.uptime.hours, 'h');
					vm.uptime.minutes = uptimeMoment.asMinutes() | 0;
					uptimeMoment.subtract(vm.uptime.minutes, 'm');
					vm.uptime.second = uptimeMoment.asSeconds() | 0;

					console.log(vm.uptime);
				});
		}

		function memPercent() {
			return (vm.mem - vm.memFree) * 100 / vm.mem;
		}

		function heapPercent() {
			return vm.heapUsed * 100 / vm.heap;
		}
	}
})();