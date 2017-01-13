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

    notificationDirectiveController.$inject = ['$interval', '$state', '$translate', 'projectsService', 'actuatorService', 'notificationService'];
        
    function notificationDirectiveController($interval, $state, $translate, projectsService, actuatorService, notificationService) {
        var vm = this;
        
        vm.downProjects;

        init();
        $interval(init, 30000);

        function init() {
            var projects = projectsService.getAllProjects();
            vm.downProjects = [];

            angular.forEach(projects, function(project) {
                getHealthInformations(project);
            });
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
                    notify(healthInformations);
                });
        }

        function notify(healthInformations) {
            var title = $translate.instant('APP_NAME') + ' - ' + healthInformations.project.name;
            var body = $translate.instant('HEALTH.' + healthInformations.status);
            var url = $state.href("dashboard", { projectId: healthInformations.project.id }, { absolute: true });
            
            notificationService.notify(title, body, url);
        }    
    }
    
})();