/**
 * Routing of the Home module
 * @namespace Home
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.home')
    .config(homeRouting);
    
    homeRouting.$inject = ['$routeProvider'];
    
    /**
     * @name homeRouting
     * @param {@link https://docs.angularjs.org/api/ngRoute/provider/$routeProvider | AngularService} $routeProvider
     * @memberOf Home
     */
    function homeRouting ($routeProvider) {
        $routeProvider.when('/', {
            template: '<div>TODO</div>',
            title: 'HOME.MODULE_NAME'
        });
    }
    
})();