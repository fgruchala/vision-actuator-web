'use strict';
    
(function () {
    
    angular
    .module('app.home')
    .controller('HomeController', homeController);
    
    homeController.$inject = ['$scope', '$rootScope', '$timeout', 'actuatorService'];
    
    function homeController ($scope, $rootScope, $timeout, actuatorService) {
        var vm = this;
    }
})();