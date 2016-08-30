/**
 * Controller of the home page
 * @namespace Home
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.home')
    .controller('HomeController', homeController);
    
    homeController.$inject = ['actuatorService'];
    
    /**
     * @name homeController
     * @param Service actuatorService
     * @memberOf Home
     */
    function homeController (actuatorService) {
        var vm = this;
        
        vm.health = {};
        vm.beans = {};
        vm.env = {};
        
        init();
        
        
        
        function init () {
            vm.health.promise = actuatorService.health(); 
            vm.beans.promise = actuatorService.beans();
            vm.env.promise = actuatorService.env();
            
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
            
            vm.beans.promise
            .then(function(response) {
                vm.beans.data = response.data[0].beans;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.beans.data = undefined;
                }
            });
            
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