/**
 * Web component to show the navigation in the title
 * @namespace Components
 * @memberOf App
 * @example <title data-v-navigation-title></title>
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.components')
    .directive('vNavigationTitle', navigationTitleDirectiveDefinition);
    
    /**
     * @name navigationTitleDirectiveDefinition
     * @desc Definition of the web component vNavigationTitle
     * @memberOf Components
     */
    function navigationTitleDirectiveDefinition () {
        var definition = {
            restrict: 'A',
            template: '{{ vm.title }}',
            scope: {},
            controller: navigationTitleDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    navigationTitleDirectiveController.$inject = ['$translate', '$scope'];
    
    /**
     * @name navigationTitleDirectiveController
     * @desc Controller of the web component vNavigationTitle
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} $translate
     * @param {@link https://docs.angularjs.org/guide/scope | AngularService} $scope
     * @memberOf navigationTitleDirectiveDefinition
     */
    function navigationTitleDirectiveController ($translate, $scope) {
        var vm = this;
        
        vm.title;
        
        $scope.$on('$routeChangeSuccess', init);
        
        
        
        function init (event, current, previous) {
            var titles = [current.title];
            
            titles.push('APP_NAME');
            
            $translate(titles)
            .then(function(translations) {
                angular.forEach(translations, function(translation, key) {
                    if(angular.isUndefined(vm.title)) {
                        vm.title = translation;
                    }
                    else {
                        vm.title = vm.title + " - " + translation;
                    }
                });
            });
        } 
    }
    
})();