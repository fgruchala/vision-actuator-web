'use strict';
    
(function () {
    
    angular
    .module('app.home')
    .controller('HomeController', homeController);
    
    homeController.$inject = ['$scope', '$rootScope', '$timeout', 'actuatorService'];
    
    function homeController ($scope, $rootScope, $timeout, actuatorService) {
        var vm = this;

        var timeoutPromise = null;
        var timeoutDelay = 500;
        
        $scope.$watch('vm.serviceUrl', function(newValue) {
            $timeout.cancel(timeoutPromise);

            timeoutPromise = $timeout(function() {
                actuatorService.setServiceUrl(newValue);
                $rootScope.$broadcast('serviceUrlChange');
            }, timeoutDelay);
        });
    }
})();