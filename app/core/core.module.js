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
     */
    angular
    .module('app.core', [
        'ngRoute',
        'ngResource',
        'ngAria',
        'ngMaterial'
    ]);
    
})();