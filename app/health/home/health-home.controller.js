/**
 * Controller of the health home tempalte
 * @namespace Health
 * @memberOf App
 */
(function () {

    'use strict';

    angular
        .module('app.health')
        .controller('HealthHomeController', HealthHomeController);

    HealthHomeController.$inject = ['$rootScope', '$interval', 'actuatorService'];

    /**
     * @name healthController
     * @param Object actuatorService
     * @memberOf Health
     */
    function HealthHomeController($rootScope, $interval, actuatorService) {
        var vm = this;
        var interval;

        vm.health = {};
        vm.error = false;
        vm.autoUpdate = true;

        vm.switchAutoUpdate = switchAutoUpdate;

        activate();



       function activate() {
            getDatas();
            switchAutoUpdate();
            $rootScope.$on('serviceUrlChange', getDatas);
        }

        function switchAutoUpdate() {
            if (vm.autoUpdate) {
                interval = $interval(function() {
                    getDatas();
                }, 1000);
            } else {
                $interval.cancel(interval);
            }
        }

        function getDatas() {
            console.log('get datas');
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
    }
})();