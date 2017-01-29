(function () {
    'use strict';
    
    angular
    .module('app')
    .config(globalConfigRouting)
    .run(globalRunRouting);
    
    globalConfigRouting.$inject = ['$urlRouterProvider'];
    globalRunRouting.$inject = ['$rootScope', '$translate', '$mdToast'];
    
    function globalConfigRouting ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

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