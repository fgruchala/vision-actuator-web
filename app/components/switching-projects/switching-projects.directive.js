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

    switchingProjectsDirectiveController.$inject = ['$scope', '$mdSidenav', '$state', 'projectsService'];
    
    function switchingProjectsDirectiveController($scope, $mdSidenav, $state, projectsService) {
        var vm = this;
    
        vm.currentProject;
        vm.projects;

        vm.selectProject = selectProject;
        vm.goHome = goHome;
        vm.closeSwitcher = closeSwitcher;

        $scope.$on('$stateChangeSuccess', init);
        
        init();

        function init() {
            vm.currentProject = projectsService.getCurrentProject();
            var projects = projectsService.getAllProjects();
            var idx = projects.indexOf(vm.currentProject);

            if(idx !== -1) {
                projects.splice(idx, 1); 
            }

            vm.projects = projects;
        }

        function selectProject(project) {
            $state.go('dashboard', { projectId: project.id }, { reload: true });
            closeSwitcher();
        }

        function goHome() {
            $state.go('home', null, { reload: true });
            closeSwitcher();
        }
        
        function closeSwitcher() {
            $mdSidenav('switcher')
            .close();
        }
    }
    
})();