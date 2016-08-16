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
     */
    function navigationTitleDirectiveDefinition () {
        var definition = {
            restrict: 'A',
            template: '{{ vm.title }}',
            controller: navigationTitleDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    navigationTitleDirectiveController.$inject = ['$translate', '$route', '$rootScope'];
    
    /**
     * @name navigationTitleDirectiveController
     * @desc Controller of the web component vNavigationTitle
     * @see {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | $translate}
     * @see {@link https://docs.angularjs.org/api/ngRoute/service/$route | $route}
     * @see {@link https://docs.angularjs.org/api/ng/service/$rootScope | $rootScope}
     */
    function navigationTitleDirectiveController ($translate, $route, $rootScope) {
        var vm = this;
        
        vm.title;
        
        $rootScope.$on('$routeChangeSuccess', init);
        
        
        
        function init (event, current, previous) {
            var titles = [current.title];
            
            if(angular.isDefined(previous)) {
                titles.push(previous.title);
            }
            
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