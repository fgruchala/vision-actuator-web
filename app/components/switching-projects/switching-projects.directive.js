/**
 * @example <v-switching-projects></v-switching-projects>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vSwitchingProjects', switchingProjectsDirectiveDefinition);
    
    function switchingProjectsDirectiveDefinition() {
        var definition = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/switching-projects/switching-projects.html',
            scope: {},
            controller: switchingProjectsDirectiveController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return definition;
    }

    switchingProjectsDirectiveController.$inject = ['$mdSidenav', '$state', 'actuatorService'];
    
    function switchingProjectsDirectiveController($mdSidenav, $state, actuatorService) {
        var vm = this;
    
        vm.currentProject;
        vm.projects;

        vm.closeSwitcher = closeSwitcher;
        vm.selectProject = selectProject;

        init();

        function init() {
            vm.currentProject = actuatorService.getCurrentProject();
            var projects = actuatorService.getAllProjects();
            var idx = projects.indexOf(vm.currentProject);

            if(idx !== -1) {
                projects.splice(idx, 1); 
            }

            vm.projects = projects;
        }
        
        function closeSwitcher() {
            $mdSidenav('switcher')
            .close();
        }

        function selectProject(project) {
            actuatorService.setCurrentProject(project);

            init();
            closeSwitcher();
            $state.go('dashboard', null, { reload: true });
        }
    }
    
})();