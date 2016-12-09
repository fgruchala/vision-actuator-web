(function () {
    
    'use strict';
    
    angular
    .module('app.threads')
    .controller('ThreadsController', threadsController);
    
    threadsController.$inject = ['threadsPrepData', 'statusPrepData', '$mdDialog'];
    
    function threadsController (threadsPrepData, statusPrepData, $mdDialog) {
        var vm = this;
        
        vm.threadsPrepData = threadsPrepData;
        vm.statusPrepData = statusPrepData;
        vm.sortedValue = '+threadId';
        vm.statusValue = angular.copy(statusPrepData);

        vm.sortBy = sortBy;
        vm.isSortedBy = isSortedBy;
        vm.selectStatus = selectStatus;
        vm.isSelectedStatus = isSelectedStatus;
        vm.search = search;
        vm.displayDetailOfThread = displayDetailOfThread;
        
        function sortBy(attribute) {
            var prev = angular.copy(vm.sortedValue);
            vm.sortedValue = '+' + attribute;
            
            if(prev === '+' + attribute) {
                vm.sortedValue = '-' + attribute;
            }
        }

        function isSortedBy(sortedValue) {
            return vm.sortedValue === sortedValue;
        }

        function selectStatus(status) {
            if(isSelectedStatus(status)) {
                if(vm.statusValue.length > 1) {
                    vm.statusValue.splice(vm.statusValue.indexOf(status), 1);
                }   
            }
            else {
                vm.statusValue.push(status);
            }
        }

        function isSelectedStatus(status) {
            return vm.statusValue.indexOf(status) !== -1;
        }

        function search() {
            return function(thread) {
                return vm.statusValue.indexOf(thread.threadState) !== -1;
            }
        }

        function displayDetailOfThread(thread) {
            $mdDialog.show({
                controller: 'DisplayThreadsPopupController',
                controllerAs: 'vm',
                templateUrl: 'app/threads/display-threads-popup.html',
                clickOutsideToClose: true,
                locals: {
                    threadPrepData: thread
                }
            });
        }

    }
    
})();