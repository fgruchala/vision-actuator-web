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
    
    beansController.$inject = ['beansPrepData', 'scopesPrepData', '$mdDialog'];
    
    /**
     * @name beansController
     * @param {Object} [beansPrepData] - Beans data 
     * @param {Object} [scopesPrepData] - Filters data providing by beans data
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} [$mdDialog]
     * @memberOf Beans
     */
    function beansController (beansPrepData, scopesPrepData, $mdDialog) {
        var vm = this;
        var INC_ITEMS = 25;
        
        vm.beansPrepData = beansPrepData;
        vm.scopesPrepData = scopesPrepData;
        vm.searchValue = {
            bean: '',
            scopes: angular.copy(scopesPrepData)
        };
        vm.limitValue = INC_ITEMS;
        
        vm.showFullInformations = showFullInformations;
        vm.more = more;
        vm.search = search;        
        vm.isSearch = isSearch;
        vm.resetSearch = resetSearch;
        vm.isSelectedScope = isSelectedScope;
        vm.selectScope = selectScope;

        
        
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
                var searchValue = vm.searchValue.bean.toLowerCase();
                var bean = beanDefinition.bean.toLowerCase();
                var displayedByBean = true; 
                var displayedByScope = false; 

                if(searchValue !== '') {
                    displayedByBean = bean.indexOf(searchValue) !== -1;
                }

                angular.forEach(vm.searchValue.scopes, function(scope, idx) {
                    displayedByScope = displayedByScope || beanDefinition.scope.indexOf(scope) !== -1;
                });

                return displayedByBean && displayedByScope;
            }
        }

        /**
         * @name isSearch
         * @returns {boolean}
         * @memberOf beansController
         */
        function isSearch () {
            return vm.searchValue.bean !== '';
        }

        /**
         * @name resetSearch
         * @memberOf beansController
         */
        function resetSearch () {
            vm.searchValue.bean = '';
        }

        /**
         * @name more
         * @memberOf beansController
         */
        function more () {
            vm.limitValue += INC_ITEMS;
        }

        /**
         * @name isSelectedScope
         * @params {String} [scope]
         * @returns {boolean}
         * @memberOf beansController
         */
        function isSelectedScope (scope) {
            return vm.searchValue.scopes.indexOf(scope) !== -1;
        }

        /**
         * @name selectScope
         * @params {String} [scope]
         * @memberOf beansController
         */
        function selectScope (scope) {
            if(isSelectedScope(scope)) {
                vm.searchValue.scopes.splice(vm.searchValue.scopes.indexOf(scope), 1);
            }
            else {
                vm.searchValue.scopes.push(scope);
            }
        }
        
    }
    
})();