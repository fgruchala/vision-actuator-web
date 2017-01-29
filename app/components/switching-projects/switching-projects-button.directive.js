/**
 * @example <v-switching-projects-button></v-switching-projects-button>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vSwitchingProjectsButton', switchingProjectsButtonDirectiveDefinition);
    
    function switchingProjectsButtonDirectiveDefinition() {
        var definition = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/switching-projects/switching-projects-button.html',
            scope: {},
            controller: switchingProjectsButtonDirectiveController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return definition;
    }

    switchingProjectsButtonDirectiveController.$inject = ['$mdSidenav'];
    
    function switchingProjectsButtonDirectiveController($mdSidenav) {
        var vm = this;

        vm.openSwitcher = openSwitcher;
        
        function openSwitcher() {
            $mdSidenav('switcher')
            .toggle();
        }
    }
    
})();