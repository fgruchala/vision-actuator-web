(function () {
    'use strict';
    
    angular
        .module('app.dashboard')
        .controller('DashboardController', dashboardController);
    
    dashboardController.$inject = ['$log', '$translate', '$mdToast', '$mdDialog', 'actuatorService'];

    function dashboardController($log, $translate, $mdToast, $mdDialog, actuatorService) {
        var vm = this;
        var loadingPromise;

        vm.getLogfile = getLogfile;
        vm.getHeapDump = getHeapDump;
        vm.confirmShutdown = confirmShutdown;

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
                templateUrl: 'app/dashboard/shutdown-popup.html',
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