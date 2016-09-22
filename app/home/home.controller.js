'use strict';

/**
 * Controller of the home page
 * @namespace Home
 * @memberOf App
 */
(function () {

    angular
    .module('app.home')
    .controller('HomeController', homeController);
    
    homeController.$inject = ['actuatorService'];
    
    /**
     * @name homeController
     * @param Service actuatorService
     * @memberOf Home
     */
    function homeController (actuatorService) {
        var vm = this;

        vm.health = {};
        vm.beans = {};
        vm.env = {};
        vm.traces = {};
        
        vm.colorFromStatus = colorFromStatus;

        init();
        
        
        
        function init () {
            vm.health.promise = actuatorService.health(); 
            vm.beans.promise = actuatorService.beans();
            vm.env.promise = actuatorService.env();

            vm.traces.promise = actuatorService.trace();
            vm.traces.promise.then(traceSuccess, traceFailure);

            vm.health.promise
            .then(function(response) {
                vm.health.data = response.data;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.health.data = undefined;
                }
                else{
                    vm.health.data = responseInError.data;
                }
            });
            
            vm.beans.promise
            .then(function(response) {
                vm.beans.data = response.data[0].beans;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.beans.data = undefined;
                }
            });
            
            vm.env.promise
            .then(function(response) {
                vm.env.data = response.data;
            },
            function(responseInError) {
                if(responseInError.status === -1 || responseInError.status === 404) {
                    vm.env.data = undefined;
                }
                else{
                    vm.env.data = responseInError.data;
                }
            });
        }

        function colorFromStatus(status) {
            if (status >= 500) {
                return 'status5xx';
            } else if (status >= 400) {
                return 'status4xx';
            } else {
                return 'status2xx';
            }
        }  

        function traceSuccess(response) {
            vm.traces.data = response.data;
            vm.latestTrace = response.data[0];
        }

        function traceFailure(error) {
            // TODO
        }
    }
})();