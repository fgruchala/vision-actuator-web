(function () {
	'use strict';

	angular
		.module('app.mappings')
		.controller('MappingsDashboardController', MappingsDashboardController);

	MappingsDashboardController.$inject = ['$rootScope', '$scope', '$timeout', 'actuatorService'];

	function MappingsDashboardController($rootScope, $scope, $timeout, actuatorService) {
		var vm = this;
		var timeout;
        var REFRESH_EVERY_MILLISECONDS = 30000;

		vm.mappings;
		vm.error = false;

		activate();

		function activate() {
			getDatas();
			$scope.$on('$destroy', function() {
				$timeout.cancel(timeout);
			});
			$rootScope.$on('serviceUrlChange', getDatas);
		}

		function getDatas() {
			vm.error = false;

			actuatorService
				.mappings()
				.then(function (response) {
					vm.mappings = response.data;
				})
            	.catch(function(response) {
					vm.error = true;
				});

			timeout = $timeout(getDatas, REFRESH_EVERY_MILLISECONDS);
		}
	}
})();