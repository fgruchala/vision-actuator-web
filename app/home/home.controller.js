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
    }
    
})();