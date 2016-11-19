(function () {
    
    'use strict';
    
    angular
    .module('app.dump')
    .config(dumpRouting);
    
    dumpRouting.$inject = ['$stateProvider'];
    
    function dumpRouting ($stateProvider) {
        $stateProvider
            .state('threadsDump', {
                url: '/threads-dump',
                templateUrl: 'app/dump/dump.html',
                controller: 'DumpController',
                controllerAs: 'vm',
                title: 'DUMP.MODULE_NAME',
                resolve: {
                    dumpPrepData: dumpPrepData,
                    statusPrepData: statusPrepData
                }
            });
    }
    
    dumpPrepData.$inject = ['actuatorService', '$location'];
    statusPrepData.$inject = ['dumpPrepData'];
    
    function dumpPrepData (actuatorService, $location, $mdToast, $translate) {
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

    function statusPrepData(dumpPrepData) {
        var status = [];

        angular.forEach(dumpPrepData, function(dump, idx) {
            if(status.indexOf(dump.threadState) == -1){
                status.push(dump.threadState);
            }
        });

        return status.sort();
    }
    
})();