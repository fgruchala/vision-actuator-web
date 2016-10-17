/**
 * Controller of the beans home template
 * @namespace Beans
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.beans')
    .controller('BeansHomeController', BeansHomeController);
    
    BeansHomeController.$inject = ['actuatorService'];
    
    /**
     * @name beansController
     * @param Object actuatorService
     * @memberOf Beans
     */
    function BeansHomeController(actuatorService) {
        var vm = this;
        vm.beans = {};

        activate();

        

        function activate() {
            vm.beans.promise = actuatorService.beans();

            vm.beans.promise
            .then(function(response) {
                vm.beans.data = response.data[0].beans;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.beans.data = undefined;
                }
            });
        }    
    }
})();