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
    
    beansController.$inject = ['beansPrepData'];
    
    /**
     * @name beansController
     * @param Object beansPrepData
     * @memberOf Beans
     */
    function beansController (beansPrepData) {
        var vm = this;
        
        vm.beansPrepData = beansPrepData;
        
    }
    
})();