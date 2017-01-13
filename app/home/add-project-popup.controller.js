(function () {
    'use strict';
    
    angular
    .module('app.components')
    .controller('SaveProjectPopupController', saveProjectPopupController);
    
    saveProjectPopupController.$inject = ['$mdDialog'];
    
    function saveProjectPopupController ($mdDialog) {
        var vm = this;
        
        vm.projectPrepData = {}; 
        
        vm.save = save;
        vm.close = close;
        
        
        
        function save () {
            $mdDialog.hide(vm.projectPrepData);
        }
        
        function close () {
            $mdDialog.cancel();
        }
    }
    
})();