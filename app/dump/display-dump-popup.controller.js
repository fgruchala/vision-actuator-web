(function () {
    
    'use strict';
    
    angular
    .module('app.dump')
    .controller('DisplayDumpPopupController', displayDumpPopupController);
    
    displayDumpPopupController.$inject = ['dumpPrepData', '$mdDialog'];
    
    function displayDumpPopupController (dumpPrepData, $mdDialog) {
        var vm = this;
        
        vm.dumpPrepData = dumpPrepData; 
        
        vm.close = close;
        
        
        
        function close () {
            $mdDialog.cancel();
        }
    }
    
})();