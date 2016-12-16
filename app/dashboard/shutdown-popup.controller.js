(function () {
    
    'use strict';
    
    angular
    .module('app.dashboard')
    .controller('ShutdownPopupController', shutdownPopupController);
    
    shutdownPopupController.$inject = ['$mdDialog', '$interval'];
    
    function shutdownPopupController ($mdDialog, $interval) {
        var vm = this;
        var intervalPromise;

        vm.counter;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.isCounterDown = isCounterDown;
        
        
        
        init();

        function init() {
            vm.counter = 5;
            intervalPromise = $interval(counterDown, 1000);
        }

        function counterDown() {
            vm.counter--;

            if(!isCounterDown()) {
                $interval.cancel(intervalPromise);
            }
        }

        function ok () {
            $mdDialog.hide();
        }
        
        function cancel () {
            $mdDialog.cancel();
        }

        function isCounterDown() {
            return vm.counter !== 0;
        }
    }
    
})();