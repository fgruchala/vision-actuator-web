(function () {
    
    'use strict';
    
    angular
    .module('app.dump')
    .controller('DumpController', dumpController);
    
    dumpController.$inject = ['dumpPrepData', 'statusPrepData', '$mdDialog'];
    
    function dumpController (dumpPrepData, statusPrepData, $mdDialog) {
        var vm = this;
        
        vm.dumpPrepData = dumpPrepData;
        vm.statusPrepData = statusPrepData;
        vm.sortedValue = '+threadId';
        vm.statusValue = angular.copy(statusPrepData);

        vm.sortBy = sortBy;
        vm.isSortedBy = isSortedBy;
        vm.selectStatus = selectStatus;
        vm.isSelectedStatus = isSelectedStatus;
        vm.search = search;
        vm.displayDetailOfDump = displayDetailOfDump;
        
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
            return function(dump) {
                return vm.statusValue.indexOf(dump.threadState) !== -1;
            }
        }

        function displayDetailOfDump(dump) {
            $mdDialog.show({
                controller: 'DisplayDumpPopupController',
                controllerAs: 'vm',
                templateUrl: 'app/dump/display-dump-popup.html',
                clickOutsideToClose: true,
                locals: {
                    dumpPrepData: dump
                }
            });
        }

    }
    
})();