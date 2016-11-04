'use strict';

(function () {
    angular
    .module('app.metrics')
    .controller('MetricsHomeController', MetricsHomeController);
    
    MetricsHomeController.$inject = ['$rootScope', 'actuatorService'];
    
    function MetricsHomeController($rootScope, actuatorService) {
        var vm = this;
        vm.labels = ["Mémoire utilisée", "Mémoire restante"];
		vm.data = [];

        activate();



        function activate() {
            getDatas();
			$rootScope.$on('serviceUrlChange', getDatas);
		}

		function getDatas() {
			actuatorService.metrics()
				.then(function (metrics) {
					var mem = parseInt(metrics.data['mem']);
					var memFree = parseInt(metrics.data['mem.free']);
					vm.data = [mem - memFree, memFree];
				});

		}
	}
})();