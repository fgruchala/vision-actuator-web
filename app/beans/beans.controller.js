/**
 * Controller of the beans page
 * @namespace Beans
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.beans')
    .controller('BeansController', beansController);
    
    beansController.$inject = ['beansPrepData', '$mdDialog'];
    
    /**
     * @name beansController
     * @param Object beansPrepData
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} $mdDialog
     * @memberOf Beans
     */
    function beansController (beansPrepData, $mdDialog) {
        var vm = this;
        
        vm.beansPrepData = beansPrepData;
        vm.filter = "";
        vm.showFullInformations = showFullInformations;
        
        
        
        function showFullInformations (bean) {
            $mdDialog.show({
                controller: 'VisuBeanPopupController',
                controllerAs: 'vm',
                templateUrl: 'app/beans/visu-bean-popup.html',
                clickOutsideToClose: true,
                locals: {
                    beanPrepData: bean
                }
            });
        }
        
    }
    
})();