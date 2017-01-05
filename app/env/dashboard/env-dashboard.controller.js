(function () {
    
    'use strict';
    
    angular
    .module('app.env')
    .controller('EnvDashboardController', EnvDashboardController);
    
    EnvDashboardController.$inject = ['$rootScope', '$scope', '$timeout', 'actuatorService'];
    
    function EnvDashboardController($rootScope, $scope, $timeout, actuatorService) {
        var vm = this;
        var timeout;
        var REFRESH_EVERY_MILLISECONDS = 15000;

        vm.env;
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
                .env()
                .then(function(response) {
                    vm.env = response.data;
                })
                .catch(function(response) {
                    vm.error = true;
                });

            timeout = $timeout(getDatas, REFRESH_EVERY_MILLISECONDS);
        }    
    }
})();