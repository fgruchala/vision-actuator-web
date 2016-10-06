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
     * @param {Object} [envPrepData] - Service with preloaded "env" data
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} [$mdDialog]
     * @memberOf Env
     */
    function envController (envPrepData, $mdDialog) {
        var vm = this;
        
        vm.envPrepData = envPrepData;
        
        vm.getApplicationPropertiesForProfile = getApplicationPropertiesForProfile;
        
        
        
        /**
         * @name getApplicationPropertiesForProfile
         * @param {String} [profile] - Profile's name. If undefined, the function will return the default profile
         * @returns {Object} - the content of the application properties file
         * @memberOf envController
         */
        function getApplicationPropertiesForProfile (profile) {
            var idx = 'applicationConfig: [classpath:/application.properties]';
            
            if(angular.isDefined(profile)) {
                idx = 'applicationConfig: [classpath:/application-' + profile + '.properties]';
            }
            
            return vm.envPrepData[idx];              
        }
    }
    
})();