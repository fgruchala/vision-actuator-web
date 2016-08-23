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
    
    homeController.$inject = ['actuatorService', 'healthPrepData'];
    
    /**
     * @name homeController
     * @param Service actuatorService
     * @param Object healthPrepData
     * @memberOf Home
     */
    function homeController (actuatorService, healthPrepData) {
        var vm = this;
        
        vm.healthPrepData = healthPrepData;
        vm.beans = {};
        
        init();
        
        
        
        function init () {
            vm.beans.promise = actuatorService.beans();
            
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