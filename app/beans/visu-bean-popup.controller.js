/**
 * Controller of the beans page
 * @namespace Beans
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.beans')
    .controller('VisuBeanPopupController', visuBeanPopupController);
    
    visuBeanPopupController.$inject = ['beanPrepData', '$mdDialog'];
    
    /**
     * @name visuBeanPopupController
     * @param Object beanPrepData
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} $mdDialog
     * @memberOf Beans
     */
    function visuBeanPopupController (beanPrepData, $mdDialog) {
        var vm = this;
        
        vm.beanPrepData = beanPrepData; 
        vm.close = close;
        
        
        
        function close () {
            $mdDialog.cancel();
        }
    }
    
})();