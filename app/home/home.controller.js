(function () {
    'use strict';
    
    angular
        .module('app.home')
        .controller('HomeController', homeController);
    
    homeController.$inject = ['$log', '$translate', '$mdToast', '$mdDialog', '$rootScope', 'actuatorService'];

    function homeController($log, $translate, $mdToast, $mdDialog, $rootScope, actuatorService) {
        var vm = this;
        var loadingPromise;
        
        vm.health = {};

        vm.getLogfile = getLogfile;
        vm.getHeapDump = getHeapDump;
        vm.confirmShutdown = confirmShutdown;
        vm.percentOfUsedDiskSpace = percentOfUsedDiskSpace;
        vm.showError = showError;

        init();
        $rootScope.$on('serviceUrlChange', init());

        function init() {
            vm.health.promise = actuatorService.health();

            vm.health.promise
            .then(function(response) {
                vm.health.data = response.data;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.health.data = undefined;
                }
                else{
                    vm.health.data = responseInError.data;
                }
            });
        }
        
        function percentOfUsedDiskSpace () {
            var percentOfUsedDiskSpace = 0;
            
            if(angular.isDefined(vm.health.data) && angular.isDefined(vm.health.data.diskSpace)) {
                var usedDiskSpace = vm.health.data.diskSpace.total - vm.health.data.diskSpace.free;
                percentOfUsedDiskSpace = Math.round((usedDiskSpace/vm.health.data.diskSpace.total)*100);
            }
            
            return percentOfUsedDiskSpace;
        }
        
        function showError (content) {
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

        function getLogfile() {
            $translate('COMMON.LOADING')
                .then(function (loadingTranslation) {
                    loadingPromise = $mdToast.showSimple(loadingTranslation);
                    
                    actuatorService
                        .logfile()
                        .then(function(response) {
                            var today = new Date();
                            downloadData(response.data, 'plain/text', 'log_' + today.toLocaleDateString() + '_' + today.toLocaleTimeString() + '.log');
                        })
                        .catch(function(err) {
                            $log.error('Failed to load logfile WS.');
                            handleWSError(err);
                        })
                        .finally(function() {
                            $mdToast.hide(loadingPromise);
                        });
                });
        }

        function getHeapDump() {
            $translate('COMMON.LOADING')
                .then(function (loadingTranslation) {
                    loadingPromise = $mdToast.showSimple(loadingTranslation);
                    
                    actuatorService
                        .heapdump()
                        .then(function(response) {
                            var today = new Date();
                            downloadData(response.data, 'application/octet-stream', 'heapdump_' + today.toLocaleDateString() + '_' + today.toLocaleTimeString() + '.hprof.gz');
                        })
                        .catch(function(err) {
                            $log.error('Failed to load heapDump WS.');
                            handleWSError(err);
                        })
                        .finally(function() {
                            $mdToast.hide(loadingPromise);
                        });
                });
        }

        function downloadData(response, type, filename) {
            var blob = new Blob([response], { type: type });
            var url = window.URL.createObjectURL(blob);
            var link = angular
                .element('<a></a>')
                .attr('download', filename)
                .attr('href', url);

            link[0].click();
        }

        function confirmShutdown() {
            $mdDialog.show({
                controller: 'ShutdownPopupController',
                controllerAs: 'vm',
                templateUrl: 'app/home/shutdown-popup.html',
                clickOutsideToClose: true
            })
            .then(shutdown);
        }

        function shutdown() {
            $translate('COMMON.LOADING')
                .then(function (loadingTranslation) {
                    loadingPromise = $mdToast.showSimple(loadingTranslation);
                    
                    actuatorService
                        .shutdown()
                        .then(function(response) {
                            $translate('COMMON.DONE')
                                .then(function (doneTranslation) {
                                    $mdToast.showSimple(doneTranslation);
                                });
                        })
                        .catch(function(err) {
                            $log.error('Failed to load shutdown WS.');
                            handleWSError(err);
                        })
                        .finally(function() {
                            $mdToast.hide(loadingPromise);
                        });
                });
        }

        function handleWSError(err) {
            $log.debug(err);
            var errorTranslationKey = 'COMMON.TECHNICAL_ERROR';

            if(err.status === -1) {
                errorTranslationKey = 'COMMON.UNAVAILABLE';
            }

            $translate(errorTranslationKey)
                .then(function (errorTranslation) {
                    $mdToast.showSimple(errorTranslation);
                });
        }
    }
})();