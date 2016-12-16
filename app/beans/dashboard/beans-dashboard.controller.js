'use strict';

(function () {
    angular
    .module('app.beans')
    .controller('BeansDashboardController', BeansDashboardController);
    
    BeansDashboardController.$inject = ['$rootScope', '$scope', '$interval', 'actuatorService', 'Configurations'];
    
    function BeansDashboardController($rootScope, $scope, $interval, actuatorService, Configurations) {
        var vm = this;
        var interval;

        vm.beans;
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
            var autoRefreshEnabled = Configurations.get('beans');
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
            var promise = actuatorService.beans();
            promise.success(function(data) {
                vm.beans = data[0].beans;
                vm.error = false;
            });
            promise.error(function(data) {
                vm.error = true;
            });
            promise.finally(function() {
                vm.loading = false;
            });
        } 
    }
})();