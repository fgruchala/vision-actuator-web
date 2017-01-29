(function () {
    
    'use strict';
    
    angular
    .module('app.threads')
    .controller('ThreadsDashboardController', threadsDashboardController);
    
    threadsDashboardController.$inject = ['$rootScope', '$scope', '$timeout', 'actuatorService'];
    
    function threadsDashboardController($rootScope, $scope, $timeout, actuatorService) {
        var vm = this;
        var timeout;
        var REFRESH_EVERY_MILLISECONDS = 15000; 

        vm.threads;
        vm.error = false;

        init();

        function init() {
            getDatas();
			$scope.$on('$destroy', function() {
				$timeout.cancel(timeout);
			});
			$rootScope.$on('serviceUrlChange', getDatas);
        }

        function getDatas() {
            vm.error = false;

            actuatorService
                .dump()
                .then(function(response) {
                    vm.threads = response.data;
                })
                .catch(function(err) {
                    vm.error = true;
                });

            timeout = $timeout(getDatas, REFRESH_EVERY_MILLISECONDS);
        }

    }
})();