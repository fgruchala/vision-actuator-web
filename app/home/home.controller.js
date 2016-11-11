(function () {
    'use strict';
    
    angular
        .module('app.home')
        .controller('HomeController', homeController);
    
    homeController.$inject = ['$log', '$translate', '$mdToast', '$mdDialog', 'actuatorService'];

    function homeController($log, $translate, $mdToast, $mdDialog, actuatorService) {
        var vm = this;
        var loadingPromise;

        vm.getLogfile = getLogfile;
        vm.confirmShutdown = confirmShutdown;

        function getLogfile() {
            $translate('COMMON.LOADING')
                .then(function (loadingTranslation) {
                    loadingPromise = $mdToast.showSimple(loadingTranslation);
                    
                    actuatorService
                        .logfile()
                        .then(function(response) {
                            downloadData(response.data);
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

        function downloadData(response) {
            var blob = new Blob([response], { type: 'plain/text' });
            var url = window.URL.createObjectURL(blob);
            var today = new Date();
            var link = angular
                .element('<a></a>')
                .attr('download', 'log_' + today.toLocaleDateString() + '_' + today.toLocaleTimeString() + '.log')
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