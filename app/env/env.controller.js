(function () {
    'use strict';
    
    angular
    .module('app.env')
    .controller('EnvController', envController);
    
    envController.$inject = ['envPrepData', '$mdDialog'];
    
    function envController (envPrepData, $mdDialog) {
        var vm = this;
        
        vm.envPrepData = envPrepData;
        
        vm.getApplicationPropertiesForProfile = getApplicationPropertiesForProfile;
        
        
        function getApplicationPropertiesForProfile (profile) {
            var idx = 'applicationConfig: [classpath:/application.properties]';
            
            if(angular.isDefined(profile)) {
                idx = 'applicationConfig: [classpath:/application-' + profile + '.properties]';
            }
            
            return vm.envPrepData[idx];              
        }
    }
    
})();