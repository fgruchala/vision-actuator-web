(function () {
    
    'use strict';
    
    angular
    .module('app.threads')
    .controller('DisplayThreadsPopupController', displayThreadsPopupController);
    
    displayThreadsPopupController.$inject = ['threadPrepData', '$mdDialog'];
    
    function displayThreadsPopupController (threadPrepData, $mdDialog) {
        var vm = this;
        
        vm.threadPrepData = threadPrepData; 
        
        vm.close = close;
        
        
        
        function close () {
            $mdDialog.cancel();
        }
    }
    
})();