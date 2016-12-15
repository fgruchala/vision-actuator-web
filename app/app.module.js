(function () {
    
    'use strict';
    
    angular
    .module('app', [
        'app.core',
        'app.services',
        'app.filters',
        'app.components',
        'app.home',
        'app.dashboard',
        'app.health',
        'app.beans',
        'app.trace',
        'app.env',
        'app.metrics',
        'app.threads',
        'app.mappings'
    ]);
    
})();