/**
 * Definition of the App
 * @namespace App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app', [
        'app.core',
        'app.services',
        'app.components',
        'app.home'
    ]);
    
})();