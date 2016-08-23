/**
 * Web component to show the navigation in the toolbar
 * @namespace Components
 * @memberOf App
 * @example <v-navigation-breadcrumb></v-navigation-breadcrumb>
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.components')
    .directive('vNavigationBreadcrumb', navigationBreadcrumbDirectiveDefinition);
    
    /**
     * @name navigationBreadcrumbDirectiveDefinition
     * @desc Definition of the web component vNavigationBreadcrumb
     * @memberOf Components
     */
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
    
    navigationBreadcrumbDirectiveController.$inject = ['$scope'];
    
    /**
     * @name navigationBreadcrumbDirectiveController
     * @desc Controller of the web component vNavigationBreadcrumb
     * @param {@link https://docs.angularjs.org/guide/scope | AngularService} $scope
     * @memberOf navigationBreadcrumbDirectiveDefinition
     */
    function navigationBreadcrumbDirectiveController ($scope) {
        var vm = this;
        
        vm.current;
        
        $scope.$on('$routeChangeSuccess', init);
        
        
        
        function init (event, current, previous) {
            vm.current = current.title;
        } 
    }
    
})();