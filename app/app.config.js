/**
 * Configuration of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(globalConfiguration);
    
    globalConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider', '$translateProvider', '$anchorScrollProvider'];
    
    /**
     * @name globalConfiguration
     * @param {@link https://material.angularjs.org/latest/api/service/$mdThemingProvider | MaterialService} [$mdThemingProvider]
     * @param {@link https://material.angularjs.org/latest/api/service/$mdIconProvider | MaterialService} [$mdIconProvider]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translateProvider | TranslateService} [$translateProvider]
     * @param {@link https://docs.angularjs.org/api/ng/provider/$anchorScrollProvider | AngularService} [$anchorScrollProvider]
     * @memberOf App
     */
    function globalConfiguration ($mdThemingProvider, $mdIconProvider, $translateProvider, $anchorScrollProvider) {
        $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
        
        $mdIconProvider
        .icon('md:menu-white', 'content/img/icons/md/menu-white.svg')
        .icon('md:translate-white', 'content/img/icons/md/translate-white.svg')
        .icon('md:radio-black', 'content/img/icons/md/radio-black.svg')
        .icon('md:radio-checked-black', 'content/img/icons/md/radio-checked-black.svg')
        .icon('md:chevron-right-white', 'content/img/icons/md/chevron-right-white.svg')
        .icon('md:ok-white', 'content/img/icons/md/ok-white.svg')
        .icon('md:close-white', 'content/img/icons/md/close-white.svg')
        .icon('md:warning-black', 'content/img/icons/md/warning-black.svg');
        
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/content/lang/locale-',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useCookieStorage();
        $translateProvider.registerAvailableLanguageKeys(['fr', 'en']);
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.preferredLanguage('fr');
        
        $anchorScrollProvider.disableAutoScrolling();
    }
    
})();