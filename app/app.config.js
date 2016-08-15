/**
 * Configuration of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(globalConfiguration);
    
    globalConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider', '$translateProvider'];
    
    /**
     * @name globalConfiguration
     * @param {@link https://material.angularjs.org/latest/api/service/$mdThemingProvider | MaterialService} $mdThemingProvider
     * @param {@link https://material.angularjs.org/latest/api/service/$mdIconProvider | MaterialService} $mdIconProvider
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translateProvider | TranslateService} $translateProvider
     * @memberOf App
     */
    function globalConfiguration ($mdThemingProvider, $mdIconProvider, $translateProvider) {
        $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
        
        $mdIconProvider
        .icon('md:menu-white', 'content/img/icons/md/menu-white.svg');
        
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/content/lang/locale-',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useCookieStorage();
        $translateProvider.preferredLanguage('fr');
    }
    
})();