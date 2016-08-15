/**
 * External dependancies of the App
 * @namespace Core
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    /**
     * @see {@link https://docs.angularjs.org/api/ngRoute | ngRoute}
     * @see {@link https://docs.angularjs.org/api/ngResource | ngResource}
     * @see {@link https://docs.angularjs.org/api/ngAria | ngAria}
     * @see {@link https://material.angularjs.org/latest/ | ngMaterial}
     * @see {@link https://docs.angularjs.org/api/ngCookies | ngCookies}
     * @see {@link https://docs.angularjs.org/api/ngSanitize | ngSanitize}
     * @see {@link https://angular-translate.github.io/docs/#/guide | pascalprecht.translate}
     */
    angular
    .module('app.core', [
        'ngRoute',
        'ngResource',
        'ngAria',
        'ngMaterial',
        'ngCookies',
        'ngSanitize',
        'pascalprecht.translate'
    ]);
    
})();