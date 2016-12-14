'use strict';

(function () {
    angular
        .module('app.health')
        .controller('HealthDashboardController', HealthDashboardController);

    HealthDashboardController.$inject = ['$rootScope', '$scope', '$interval', 'actuatorService', 'Configurations'];

    function HealthDashboardController($rootScope, $scope, $interval, actuatorService, Configurations) {
        var vm = this;
        var interval;

        vm.health;
        vm.error = false;
        vm.loading = true;

        activate();



        function activate() {
            getDatas();
            onConfigurationChange();
            $rootScope.$on('configurationChange', onConfigurationChange);
            $scope.$on('$destroy', stopInterval);
            $rootScope.$on('serviceUrlChange', getDatas);
        }

        function onConfigurationChange() {
            var autoRefreshEnabled = Configurations.get('health');
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

        function getDatas() {
            var promise = actuatorService.health();
            promise.success(function(data) {
                vm.health = data;
                vm.error = false;
            });
            promise.error(function(data) {
                vm.health = undefined;
                vm.error = true;
            });
            promise.finally(function() {
                vm.loading = false;
            });
        }
    }
})();