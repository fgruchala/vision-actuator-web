(function () {
    
    'use strict';
    
    angular
    .module('app.threads')
    .controller('ThreadsHomeController', threadsHomeController);
    
    threadsHomeController.$inject = ['actuatorService'];
    
    function threadsHomeController(actuatorService) {
        var vm = this;
        vm.threads = {};

        init();

        

        function init() {
            vm.threads.promise = actuatorService.dump();

            vm.threads.promise
            .then(function(response) {
                vm.threads.data = response.data;
            })
            .catch(function(err) {
                if(err.status === -1 || err.status === 404) {
                    vm.threads.data = undefined;
                }
            });
        }

    }
})();