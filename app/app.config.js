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
        .icon('md:menu-white', 'content/img/icons/md/menu-white.svg')
        .icon('md:translate-white', 'content/img/icons/md/translate-white.svg')
        .icon('md:radio-black', 'content/img/icons/md/radio-black.svg')
        .icon('md:radio-checked-black', 'content/img/icons/md/radio-checked-black.svg')
        .icon('md:chevron-right-white', 'content/img/icons/md/chevron-right-white.svg')
        .icon('md:ok-white', 'content/img/icons/md/ok-white.svg')
        .icon('md:close-white', 'content/img/icons/md/close-white.svg')
        .icon('md:warning-black', 'content/img/icons/md/warning-black.svg')
        .icon('md:info-black', 'content/img/icons/md/info-black.svg')
        .icon('md:clear-black', 'content/img/icons/md/clear-black.svg')
        .icon('md:search-black', 'content/img/icons/md/search-black.svg')
        .icon('md:add-white', 'content/img/icons/md/add-white.svg')
        .icon('md:settings-white', 'content/img/icons/md/settings-white.svg')
        .icon('md:trace', 'content/img/icons/md/trace.svg')
        .icon('md:log', 'content/img/icons/md/log.svg')
        .icon('md:shutdown', 'content/img/icons/md/shutdown.svg')
        .icon('md:time', 'content/img/icons/md/time.svg')
        .icon('md:number', 'content/img/icons/md/number.svg')
        .icon('md:memory', 'content/img/icons/md/memory.svg');

        
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
            // 'env',
            // 'actuator',
            // 'autoconfig',
            // 'configprops',
            // 'dump',
            // 'flyway',
            // 'info',
            // 'liquibase',
            // 'metrics',
            // 'mappings', 
            // 'shutdown',
            // 'trace',
            // 'docs',
            // 'heapdump',
            // 'jolokia',
            // 'logfile'
            ];

        ConfigurationsProvider.setActuatorEndpoint(endpoints);
        // TODO ajouter la conf du actuator service
    }
})();