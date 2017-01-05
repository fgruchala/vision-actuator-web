(function () {
    'use strict';
    
    angular
    .module('app')
    .config(globalConfiguration);
    
    globalConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider', '$translateProvider', '$anchorScrollProvider'];
    
    function globalConfiguration ($mdThemingProvider, $mdIconProvider, $translateProvider, $anchorScrollProvider) {
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
    }
})();