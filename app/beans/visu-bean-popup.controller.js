(function () {
    'use strict';
    
    angular
    .module('app.beans')
    .controller('VisuBeanPopupController', visuBeanPopupController);
    
    visuBeanPopupController.$inject = ['beanPrepData', '$mdDialog'];
    
    function visuBeanPopupController (beanPrepData, $mdDialog) {
        var vm = this;
        
        vm.beanPrepData = beanPrepData; 
        vm.close = close;
        
        function close () {
            $mdDialog.cancel();
        }
    }
    
})();