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
    
    HealthHomeController.$inject = ['actuatorService'];
    
    /**
     * @name healthController
     * @param Object actuatorService
     * @memberOf Health
     */
    function HealthHomeController(actuatorService) {
        var vm = this;
        vm.health = {};

        activate();

        

        function activate() {
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