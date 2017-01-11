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
            template: '{{ vm.title }} - {{ \'APP_NAME\' | translate }}',
            scope: {},
            controller: navigationTitleDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    navigationTitleDirectiveController.$inject = ['$scope', '$translate', 'actuatorService'];
    
    function navigationTitleDirectiveController ($scope, $translate, actuatorService) {
        var vm = this;
        
        vm.title;
        
        $scope.$on('$stateChangeSuccess', init);
        
        function init (event, current, previous) {
            vm.title = $translate.instant(current.title);
            var project = actuatorService.getCurrentProject();
            
            if(angular.isDefined(project)) {
                vm.title = "[" + project.name + "] " + vm.title;
            }
        }

    }
    
})();