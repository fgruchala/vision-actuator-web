(function () {  
    'use strict';
    
    angular
    .module('app.beans')
    .controller('BeansController', beansController);
    
    beansController.$inject = ['beansPrepData', 'scopesPrepData', '$mdDialog'];
    
    function beansController (beansPrepData, scopesPrepData, $mdDialog) {
        var vm = this;
        var INC_ITEMS = 50;
        
        vm.beansPrepData = beansPrepData;
        vm.scopesPrepData = scopesPrepData;
        vm.filtering = {
            bean: '',
            scopes: angular.copy(scopesPrepData)
        };
        vm.limitValue = INC_ITEMS;
        
        vm.showFullInformations = showFullInformations;
        vm.more = more;
        vm.filter = filter;        
        vm.isSelectedScope = isSelectedScope;
        vm.selectScope = selectScope;

        
        
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

        function filter () {
            return function (beanDefinition) {
                return beanDefinition.bean.toLowerCase().indexOf(vm.filtering.bean.toLowerCase()) !== -1 
                    && vm.filtering.scopes.indexOf(beanDefinition.scope) !== -1;
            }
        }

        function more () {
            vm.limitValue += INC_ITEMS;
        }

        function isSelectedScope (scope) {
            return vm.filtering.scopes.indexOf(scope) !== -1;
        }

        function selectScope (scope) {
            if(isSelectedScope(scope)) {
                vm.filtering.scopes.splice(vm.filtering.scopes.indexOf(scope), 1);
            }
            else {
                vm.filtering.scopes.push(scope);
            }
        }
        
    }
    
})();