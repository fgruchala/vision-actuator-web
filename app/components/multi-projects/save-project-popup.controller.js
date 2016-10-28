/**
 * Controller of the save new project popup
 * @namespace Components
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.components')
    .controller('SaveProjectPopupController', saveProjectPopupController);
    
    saveProjectPopupController.$inject = ['projectPrepData', '$mdDialog'];
    
    /**
     * @name saveProjectPopupController
     * @param {Object} [projectPrepData]
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} [$mdDialog]
     * @memberOf Components
     */
    function saveProjectPopupController (projectPrepData, $mdDialog) {
        var vm = this;
        
        vm.projectPrepData = projectPrepData; 
        
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