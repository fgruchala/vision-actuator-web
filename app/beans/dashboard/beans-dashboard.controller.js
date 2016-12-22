'use strict';

(function () {
    angular
    .module('app.beans')
    .controller('BeansDashboardController', BeansDashboardController);
    
    BeansDashboardController.$inject = ['$rootScope', '$scope', '$interval', 'actuatorService'];
    
    function BeansDashboardController($rootScope, $scope, $interval, actuatorService) {
        var vm = this;
        var interval;

        vm.beans;
        vm.error = false;
        vm.loading = true;

        activate();

        

        function activate() {
            getDatas();
            //$scope.$on('$destroy', stopInterval);
            $rootScope.$on('serviceUrlChange', getDatas);
        }

        function getDatas() {
            var promise = actuatorService.beans();
            promise.then(function(data) {
                vm.beans = data[0].beans;
                vm.error = false;
            });
            promise.catch(function(data) {
                vm.error = true;
            });
            promise.finally(function() {
                vm.loading = false;
            });
        } 
    }
})();