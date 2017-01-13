/*
 * @example <v-navigation-breadcrumb></v-navigation-breadcrumb>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vNavigationBreadcrumb', navigationBreadcrumbDirectiveDefinition);
    
    function navigationBreadcrumbDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            templateUrl: 'app/components/navigation-breadcrumb/navigation-breadcrumb.html',
            scope: {},
            controller: navigationBreadcrumbDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    navigationBreadcrumbDirectiveController.$inject = ['$scope', 'projectsService'];
    
    function navigationBreadcrumbDirectiveController ($scope, projectsService) {
        var vm = this;
        
        vm.project;
        vm.module;
        
        $scope.$on('$stateChangeSuccess', init);

        function init (event, current, previous) {
            vm.project = projectsService.getCurrentProject();
            vm.module = current.title;
        } 

    }
    
})();