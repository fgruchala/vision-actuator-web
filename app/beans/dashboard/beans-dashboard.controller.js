'use strict';

(function () {
    angular
    .module('app.beans')
    .controller('BeansDashboardController', BeansDashboardController);
    
    BeansDashboardController.$inject = ['$rootScope', '$scope', '$timeout', 'actuatorService'];
    
    function BeansDashboardController($rootScope, $scope, $timeout, actuatorService) {
        var vm = this;
        var timeout;
        var REFRESH_EVERY_MILLISECONDS = 30000;

        vm.beans;
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
                .beans()
                .then(function(response) {
                    vm.beans = response.data[0].beans;
                })
                .catch(function(data) {
                    vm.error = true;
                });

            timeout = $timeout(getDatas, REFRESH_EVERY_MILLISECONDS);
        } 
    }
})();