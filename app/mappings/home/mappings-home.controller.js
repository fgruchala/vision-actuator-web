(function () {
	'use strict';

	angular
		.module('app.mappings')
		.controller('MappingsHomeController', MappingsHomeController);

	MappingsHomeController.$inject = ['$rootScope', 'actuatorService'];

	function MappingsHomeController($rootScope, actuatorService) {
		var vm = this;
		vm.mappings = {};

		activate();



		function activate() {
			getDatas();
			$rootScope.$on('serviceUrlChange', getDatas);
		}

		function getDatas() {
			vm.mappings.promise = actuatorService.mappings();

			vm.mappings.promise
				.then(function (mappings) {
					vm.mappings.data = mappings.data;
				})
            	.catch(function(err) {
					if(err.status === -1 || err.status === 404) {
						vm.threads.data = undefined;
					}
				});
		}
	}
})();