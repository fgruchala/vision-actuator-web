'use strict';

(function () { 
    angular
    .module('app.components')
    .directive('vConfiguration', configurationDirective);

    function configurationDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/configuration/configuration.html',
			scope: {},
            controller: configurationDirectiveController,
            controllerAs: 'vm'
        }
    }

	configurationDirectiveController.$inject = ['$mdMenu', 'actuatorService', 'Configurations'];
    
    function configurationDirectiveController($mdMenu, actuatorService, Configurations) {
        var vm = this;
		vm.configurations = Configurations.getConfigurations();
		vm.switchValue = switchValue;

		
		function switchValue(key) {
			var lastValue = Configurations.get(key);
			Configurations.set(key, !lastValue);
		}
    }
})(); 