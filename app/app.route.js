/**
 * Global Routing of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(globalConfigRouting)
    .run(globalRunRouting);
    
    globalConfigRouting.$inject = ['$urlRouterProvider'];
    globalRunRouting.$inject = ['$rootScope', '$translate', '$mdToast'];
    
    /**
     * @name globalConfigRouting
     * @param {@link https://github.com/angular-ui/ui-router/wiki/URL-Routing#urlrouterprovider | UiRouterService} [$urlRouterProvider]
     * @memberOf App
     */
    function globalConfigRouting ($urlRouterProvider) {
        // $urlRouterProvider.otherwise('/');
        $urlRouterProvider.otherwise('/dashboard');
    }

    /**
     * @name globalRunRouting
     * @param {@link https://docs.angularjs.org/api/ng/service/$rootScope | AngularService} [$rootScope]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} [$translate]
     * @param {@link https://material.angularjs.org/latest/api/service/$mdToast | MaterialService} [$mdToast]
     * @memberOf App
     */
    function globalRunRouting ($rootScope, $translate, $mdToast) {
        var loadingPromise;

        $rootScope.$on('$stateChangeStart', function() {
            $translate('COMMON.LOADING')
                .then(function (loadingTranslation) {
                    loadingPromise = $mdToast.showSimple(loadingTranslation);
                });
        });

        $rootScope.$on('$viewContentLoaded', function() {
            $mdToast.hide(loadingPromise);
        });
    }
    
})();