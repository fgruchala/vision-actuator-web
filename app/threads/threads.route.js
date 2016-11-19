(function () {
    
    'use strict';
    
    angular
    .module('app.threads')
    .config(threadsRouting);
    
    threadsRouting.$inject = ['$stateProvider'];
    
    function threadsRouting ($stateProvider) {
        $stateProvider
            .state('threads', {
                url: '/threads',
                templateUrl: 'app/threads/threads.html',
                controller: 'ThreadsController',
                controllerAs: 'vm',
                title: 'THREADS.MODULE_NAME',
                resolve: {
                    threadsPrepData: threadsPrepData,
                    statusPrepData: statusPrepData
                }
            });
    }
    
    threadsPrepData.$inject = ['actuatorService', '$location'];
    statusPrepData.$inject = ['threadsPrepData'];
    
    function threadsPrepData (actuatorService, $location, $mdToast, $translate) {
        return actuatorService
                .dump()
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    if(err.status === -1 || err.status === 404) {
                        $location.url('/');
                    }
                    
                    return err.data;
                });
    }

    function statusPrepData(threadsPrepData) {
        var status = [];

        angular.forEach(threadsPrepData, function(thread, idx) {
            if(status.indexOf(thread.threadState) == -1){
                status.push(thread.threadState);
            }
        });

        return status.sort();
    }
    
})();