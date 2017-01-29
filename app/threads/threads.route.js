(function () {  
    'use strict';
    
    angular
    .module('app.threads')
    .config(threadsRouting);
    
    threadsRouting.$inject = ['$stateProvider'];
    
    function threadsRouting ($stateProvider) {
        $stateProvider
            .state('threads', {
                parent: 'project',
                url: '/threads',
                templateUrl: 'app/threads/threads.html',
                controller: 'ThreadsController',
                controllerAs: 'vm',
                title: 'THREADS.MODULE_NAME'
            });
    }
    
})();