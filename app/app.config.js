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
        .icon('md:translate', 'content/img/icons/md/translate.svg')
        .icon('md:radio-black', 'content/img/icons/md/radio-black.svg')
        .icon('md:radio-checked-black', 'content/img/icons/md/radio-checked-black.svg')
        .icon('md:chevron-right-white', 'content/img/icons/md/chevron-right-white.svg')
        .icon('md:ok-white', 'content/img/icons/md/ok-white.svg')
        .icon('md:close-white', 'content/img/icons/md/close-white.svg')
        .icon('md:warning-black', 'content/img/icons/md/warning-black.svg')
        .icon('md:info-black', 'content/img/icons/md/info-black.svg')
        .icon('md:clear-black', 'content/img/icons/md/clear-black.svg')
        .icon('md:search', 'content/img/icons/md/search.svg')
        .icon('md:add-white', 'content/img/icons/md/add-white.svg')
        .icon('md:trace', 'content/img/icons/md/trace.svg')
        .icon('md:log', 'content/img/icons/md/log.svg')
        .icon('md:shutdown', 'content/img/icons/md/shutdown.svg')
        .icon('md:time', 'content/img/icons/md/time.svg')
        .icon('md:number', 'content/img/icons/md/number.svg')
        .icon('md:memory', 'content/img/icons/md/memory.svg')
        .icon('md:equals', 'content/img/icons/md/equals.svg')
        .icon('md:visibility-on', 'content/img/icons/md/visibility-on.svg')
        .icon('md:visibility-off', 'content/img/icons/md/visibility-off.svg')
        .icon('md:nothing-to-see', 'content/img/icons/md/nothing-to-see.svg')
        .icon('md:feedback', 'content/img/icons/md/feedback.svg')
        .icon('md:notifications-active', 'content/img/icons/md/notifications-active.svg')
        .icon('md:notifications-none', 'content/img/icons/md/notifications-none.svg')
        .icon('md:notifications-off', 'content/img/icons/md/notifications-off.svg');

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