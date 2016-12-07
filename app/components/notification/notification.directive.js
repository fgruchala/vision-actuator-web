/**
 * @example <v-notification></v-notification>
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.components')
    .directive('vNotification', notificationDirectiveDefinition);
    
    function notificationDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/notification/notification.html',
            controller: notificationDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }

    notificationDirectiveController.$inject = ['$interval', '$location', '$translate', 'actuatorService', 'notificationService'];
        
    function notificationDirectiveController($interval, $location, $translate, actuatorService, notificationService) {
        var vm = this;
        var prevHealth;
        
        vm.currentHealth;   

        activate();
        $interval(activate, 5000);

        function activate() {
            actuatorService
                .health()
                .then(function(health) {
                    prevHealth = angular.copy(vm.currentHealth);
                    vm.currentHealth = health.data.status;
                })
                .catch(function(err) {
                    prevHealth = angular.copy(vm.currentHealth);
                    vm.currentHealth = 'NONE';
                })
                .finally(function(){
                    if(angular.isDefined(prevHealth) && vm.currentHealth !== prevHealth) {
                        notificationService.notify(actuatorService.getCurrentProject().name, $translate.instant('HEALTH.' + vm.currentHealth), $location.absUrl());
                    }
                });
        }    
    }
    
})();