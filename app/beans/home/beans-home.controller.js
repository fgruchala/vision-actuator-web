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
    
    BeansHomeController.$inject = ['$rootScope', 'actuatorService'];
    
    /**
     * @name beansController
     * @param Object actuatorService
     * @memberOf Beans
     */
    function BeansHomeController($rootScope, actuatorService) {
        var vm = this;
        vm.beans = {};

        activate();

        

        function activate() {
            getDatas();
            $rootScope.$on('serviceUrlChange', getDatas);
        }

        function getDatas() {
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