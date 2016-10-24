/**
 * Controller of the env home template
 * @namespace Env
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.env')
    .controller('EnvHomeController', EnvHomeController);
    
    EnvHomeController.$inject = ['$rootScope', 'actuatorService'];
    
    /**
     * @name beansController
     * @param Object actuatorService
     * @memberOf Beans
     */
    function EnvHomeController($rootScope, actuatorService) {
        var vm = this;
        vm.env = {};

        activate();

        

        function activate() {
            getDatas();
            $rootScope.$on('serviceUrlChange', getDatas);
        }

        function getDatas() {
            vm.env.promise = actuatorService.env();

            vm.env.promise
            .then(function(response) {
                vm.env.data = response.data;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.env.data = undefined;
                }
                else{
                    vm.env.data = responseInError.data;
                }
            });
        }    
    }
})();