'use strict';

(function () {
    angular
        .module('app.health')
        .controller('HealthDashboardController', HealthDashboardController);

    HealthDashboardController.$inject = ['$rootScope', '$scope', '$timeout', '$translate', '$mdDialog', 'actuatorService'];

    function HealthDashboardController($rootScope, $scope, $timeout, $translate, $mdDialog, actuatorService) {
        var vm = this;
        var timeout;
        var REFRESH_EVERY_MILLISECONDS = 5000;

        vm.health;
        vm.error = false;

        vm.percentOfUsedDiskSpace = percentOfUsedDiskSpace;
        vm.showError = showError;

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
                .health()
                .then(function(response) {
                    vm.health = response.data;
                })
                .catch(function(response) {
                    if(response.status === -1 || response.status === 404) {
                        vm.error = true;
                    }
                    else {
                        vm.health = response.data;
                    }
                });

            timeout = $timeout(getDatas, REFRESH_EVERY_MILLISECONDS);
        }

        function percentOfUsedDiskSpace() {
            var percentOfUsedDiskSpace = 0;
            
            if(angular.isDefined(vm.health) && angular.isDefined(vm.health.diskSpace)) {
                var usedDiskSpace = vm.health.diskSpace.total - vm.health.diskSpace.free;
                percentOfUsedDiskSpace = Math.round((usedDiskSpace/vm.health.diskSpace.total)*100);
            }
            
            return percentOfUsedDiskSpace;
        }
        
        function showError(content) {
            if(angular.isDefined(content)) {
                $translate(['COMMON.TITLE-ERROR', 'COMMON.OK'])
                .then(function(translations) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title(translations['COMMON.TITLE-ERROR'])
                        .textContent(content)
                        .ariaLabel('Error Dialog')
                        .ok(translations['COMMON.OK'])
                    );
                });
            }
        }
    }
})();