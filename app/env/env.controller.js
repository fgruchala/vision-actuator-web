/**
 * Controller of the env page
 * @namespace Env
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.env')
    .controller('EnvController', envController);
    
    envController.$inject = ['envPrepData', '$mdDialog'];
    
    /**
     * @name envController
     * @param Object envPrepData
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} $mdDialog
     * @memberOf Env
     */
    function envController (envPrepData, $mdDialog) {
        var vm = this;
        
        vm.envPrepData = envPrepData;
        
        vm.getApplicationPropertiesForProfile = getApplicationPropertiesForProfile;
        
        
        
        function getApplicationPropertiesForProfile (profile) {
            var idx = 'applicationConfig: [classpath:/application-' + profile + '.properties]';
            
            return vm.envPrepData[idx];              
        }
    }
    
})();