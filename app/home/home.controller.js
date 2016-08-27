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
        
        init();
        
        
        
        function init () {
            vm.health.promise = actuatorService.health(); 
            vm.beans.promise = actuatorService.beans();
            
            vm.health.promise
            .then(function(response) {
                vm.health.data = response.data;
            },
            function(responseInError) {
                vm.health.data = undefined;
            });
            
            vm.beans.promise
            .then(function(response) {
                vm.beans.data = response.data[0].beans;
            },
            function(responseInError) {
                vm.beans.data = undefined;
            });
        }
        
    }
    
})();