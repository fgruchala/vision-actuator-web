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
     * @param {Object} [beansPrepData] - Beans data 
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} [$mdDialog]
     * @memberOf Beans
     */
    function beansController (beansPrepData, $mdDialog) {
        var vm = this;
        var INC_ITEMS = 25;
        
        vm.beansPrepData = beansPrepData;
        vm.searchValue = "";
        vm.limitValue = INC_ITEMS;
        
        vm.showFullInformations = showFullInformations;
        vm.more = more;
        vm.search = search;        
        vm.isSearch = isSearch;
        vm.resetSearch = resetSearch;

        
        
        /**
         * @name showFullInformations
         * @param {Object} [bean] - Bean data to show
         * @memberOf beansController
         */
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

        /**
         * @name search
         * @returns {boolean}
         * @memberOf beansController
         */
        function search () {
            return function (beanDefinition) {
                if(vm.searchValue === "") {
                    return true;
                }

                var searchValue = vm.searchValue.toLowerCase();
                var bean = beanDefinition.bean.toLowerCase();
                var scope = beanDefinition.scope.toLowerCase();

                return (bean.indexOf(searchValue) !== -1 || scope.indexOf(searchValue) !== -1);
            }
        }

        /**
         * @name isSearch
         * @returns {boolean}
         * @memberOf beansController
         */
        function isSearch () {
            return vm.searchValue !== '';
        }

        /**
         * @name resetSearch
         * @memberOf beansController
         */
        function resetSearch () {
            vm.searchValue = '';
        }

        /**
         * @name more
         * @memberOf beansController
         */
        function more () {
            vm.limitValue += INC_ITEMS;
        }
        
    }
    
})();