/**
 * @example <title data-v-navigation-title></title>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vNavigationTitle', navigationTitleDirectiveDefinition);
    
    function navigationTitleDirectiveDefinition () {
        var definition = {
            restrict: 'A',
            template: '[{{ vm.project.name }}] {{ vm.module | translate }} - {{ \'APP_NAME\' | translate }}',
            scope: {},
            controller: navigationTitleDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    navigationTitleDirectiveController.$inject = ['$scope', 'actuatorService'];
    
    function navigationTitleDirectiveController ($scope, actuatorService) {
        var vm = this;
        
        vm.project;
        vm.module;
        
        $scope.$on('$stateChangeSuccess', init);
        
        function init (event, current, previous) {
            vm.project = actuatorService.getCurrentProject();
            vm.module = current.title;
        }

    }
    
})();