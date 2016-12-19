/**
 * Configuration of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(globalConfiguration);
    
    globalConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider', '$translateProvider', '$anchorScrollProvider', 'ConfigurationsProvider'];
    
    /**
     * @name globalConfiguration
     * @param {@link https://material.angularjs.org/latest/api/service/$mdThemingProvider | MaterialService} [$mdThemingProvider]
     * @param {@link https://material.angularjs.org/latest/api/service/$mdIconProvider | MaterialService} [$mdIconProvider]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translateProvider | TranslateService} [$translateProvider]
     * @param {@link https://docs.angularjs.org/api/ng/provider/$anchorScrollProvider | AngularService} [$anchorScrollProvider]
     * @memberOf App
     */
    function globalConfiguration ($mdThemingProvider, $mdIconProvider, $translateProvider, $anchorScrollProvider, ConfigurationsProvider) {
        $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
        
        $mdIconProvider
        .icon('md:translate', 'content/img/icons/md/translate.svg')
        .icon('md:radio', 'content/img/icons/md/radio.svg')
        .icon('md:radio-checked', 'content/img/icons/md/radio-checked.svg')
        .icon('md:chevron-right', 'content/img/icons/md/chevron-right.svg')
        .icon('md:close', 'content/img/icons/md/close.svg')
        .icon('md:warning', 'content/img/icons/md/warning.svg')
        .icon('md:info', 'content/img/icons/md/info.svg')
        .icon('md:search', 'content/img/icons/md/search.svg')
        .icon('md:add', 'content/img/icons/md/add.svg')
        .icon('md:settings', 'content/img/icons/md/settings.svg')
        .icon('md:trace', 'content/img/icons/md/trace.svg')
        .icon('md:log', 'content/img/icons/md/log.svg')
        .icon('md:shutdown', 'content/img/icons/md/shutdown.svg')
        .icon('md:time', 'content/img/icons/md/time.svg')
        .icon('md:number', 'content/img/icons/md/number.svg')
        .icon('md:memory', 'content/img/icons/md/memory.svg')
        .icon('md:visibility-on', 'content/img/icons/md/visibility-on.svg')
        .icon('md:visibility-off', 'content/img/icons/md/visibility-off.svg')
        .icon('md:feedback', 'content/img/icons/md/feedback.svg')
        .icon('md:notifications-active', 'content/img/icons/md/notifications-active.svg')
        .icon('md:notifications-none', 'content/img/icons/md/notifications-none.svg')
        .icon('md:notifications-off', 'content/img/icons/md/notifications-off.svg');

        $translateProvider.useStaticFilesLoader({
            prefix: '/content/lang/locale-',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useCookieStorage();
        $translateProvider.registerAvailableLanguageKeys(['fr', 'en']);
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.preferredLanguage('fr');
        
        $anchorScrollProvider.disableAutoScrolling();

        // Configuration des endpoints utilisés dans l'application
        var endpoints = [
            'health',
            'beans',
            'metrics'
            ];

        ConfigurationsProvider.setActuatorEndpoint(endpoints);
    }
})();