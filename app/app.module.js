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
        'app.filters',
        'app.components',
        'app.home',
        'app.health',
        'app.beans',
        'app.trace',
        'app.env',
        'app.metrics'
    ]);
    
})();