(function () {
    'use strict';
    
    angular
    .module('app.threads')
    .controller('ThreadsController', threadsController);
    
    threadsController.$inject = ['$scope', '$mdDialog', '$timeout', 'actuatorService'];
    
    function threadsController($scope, $mdDialog, $timeout, actuatorService) {
        var vm = this;
        var timeout;
        var REFRESH_EVERY_MILLISECONDS = 30000;
        
        vm.threadsPrepData;
        vm.statusPrepData;
        vm.statusValue;
        vm.sortedValue = '+threadId';
        vm.autoRefreshEnabled = true;

        vm.sortBy = sortBy;
        vm.isSortedBy = isSortedBy;
        vm.selectStatus = selectStatus;
        vm.isSelectedStatus = isSelectedStatus;
        vm.search = search;
        vm.displayDetailOfThread = displayDetailOfThread;
        vm.refreshAuto = refreshAuto;
        
        init();

        function init() {
            initDatas();
            $scope.$on('$destroy', function() {
                $timeout.cancel(timeout);
            });
        }

        function initDatas() {
            actuatorService
                .dump()
                .then(function(response) {
                    vm.threadsPrepData = response.data;
                    initFilters();
                })
                .catch(function(err) {
                    if(err.status === -1 || err.status === 404) {
                        $location.url('/dashboard');
                    }
                });

            refreshAuto();
        }

        function initFilters() {
            var status = [];

            angular.forEach(vm.threadsPrepData, function(thread, idx) {
                if(status.indexOf(thread.threadState) == -1){
                    status.push(thread.threadState);
                }
            });

            vm.statusPrepData = status.sort();
            vm.statusValue = (angular.isDefined(vm.statusValue) ? refreshCurrentFilters() : angular.copy(vm.statusPrepData));
        }

        function refreshCurrentFilters() {
            var currentStatus = [];

            angular.forEach(vm.statusValue, function(status, idx) {
                if(vm.statusPrepData.indexOf(status) !== -1) {
                    currentStatus.push(status);
                }
            });

            return currentStatus;
        }

        function refreshAuto(autoRefreshEnabled) {
            vm.autoRefreshEnabled = (angular.isUndefined(autoRefreshEnabled) ? true : !autoRefreshEnabled);

            if(vm.autoRefreshEnabled) {
                timeout = $timeout(initDatas, REFRESH_EVERY_MILLISECONDS);
            }
            else {
                $timeout.cancel(timeout);
            }
        }

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
                vm.statusValue.splice(vm.statusValue.indexOf(status), 1);   
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