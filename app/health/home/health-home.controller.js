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

    HealthHomeController.$inject = ['$rootScope', 'actuatorService'];

    /**
     * @name healthController
     * @param Object actuatorService
     * @memberOf Health
     */
    function HealthHomeController($rootScope, actuatorService) {
        var vm = this;
        vm.health;
        vm.error = false;

        activate();



        function activate() {
            actuatorService.health(successFn, errorFn);
        }

        function successFn(response) {
            console.log(response);
            vm.health = response.data;
        }

        function errorFn(error) {
            vm.error = true;
        }
    }
})();