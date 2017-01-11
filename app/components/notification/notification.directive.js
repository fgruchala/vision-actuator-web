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
        
        vm.downProjects;

        init();
        $interval(init, 30000);

        function init() {
            var projects = actuatorService.getAllProjects();
            vm.downProjects = [];
            
            angular.forEach(projects, function(project) {
                getHealthInformations(project);
            });

            notify();
        }

        function getHealthInformations(project) {
            var healthInformations = {};

            actuatorService
                .health(project.url)
                .catch(function(err) {
                    healthInformations.project = project;
                    healthInformations.status = 'DOWN';
                    
                    if(err.status === -1 || err.status === 404) {
                        healthInformations.status = 'NONE';
                    }

                    vm.downProjects.push(healthInformations);
                });
        }

        function notify() {
            if(vm.downProjects.length>0) {
                var downCounter = 0;
                var noneCounter = 0;
                var body = "";

                angular.forEach(vm.downProjects, function(downProject) {
                    if(downProject.status === 'NONE') {
                        noneCounter++;
                    }
                    else {
                        downCounter++;
                    }
                });

                body = downCounter + " " + $translate.instant('HEALTH.DOWN');
                body += '<br />';
                body += noneCounter + " " + $translate.instant('HEALTH.NONE');

                notificationService.notify($translate.instant('APP_NAME'), body, $location.absUrl());
            }
        }    
    }
    
})();