/**
 * Configuration of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app')
    .config(globalConfiguration);
    
    globalConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider'];
    
    /**
     * @name globalConfiguration
     * @param {@link https://material.angularjs.org/latest/api/service/$mdThemingProvider | MaterialService} $mdThemingProvider
     * @param {@link https://material.angularjs.org/latest/api/service/$mdIconProvider | MaterialService} $mdIconProvider
     * @memberOf App
     */
    function globalConfiguration ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
        
        $mdIconProvider
        .icon('md:menu-white', 'content/img/icons/md/menu-white.svg');
    }
    
})();