(function () {
    'use strict';
    
    angular
        .module('app.home')
        .controller('HomeController', homeController);
    
    homeController.$inject = ['$log', '$translate', '$mdToast', 'actuatorService'];

    function homeController($log, $translate, $mdToast, actuatorService) {
        var vm = this;
        var loadingPromise;

        vm.getLogfile = getLogfile;

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
                            $log.debug(err);
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
    }
})();