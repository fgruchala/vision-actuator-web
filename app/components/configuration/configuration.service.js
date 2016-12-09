'use strict';
(function () {
	angular
		.module('app.components')
		.provider('Configurations', ConfigurationsProvider);

	function ConfigurationsProvider() {
		var _this = this;
		var configurations = [];

		// Méthodes du provider, permet la configuration du service en phase de run, ainsi que la création du service 
		_this.$get = ConfigurationsService;
		_this.setActuatorEndpoint = setActuatorEndpoint;

		function setActuatorEndpoint(endpoints) {
			if (endpoints) {
				angular.forEach(endpoints, function (endpoint) {
					configurations.push({
						'key': endpoint,
						'value': false
					});
				})
			}
		}

		// Méthodes du service utilisé dans l'app
		ConfigurationsService.$inject = ['$rootScope'];
		function ConfigurationsService($rootScope) {
			return {
				'getConfigurations': getConfigurations,
				'set': set,
				'get': get
			}

			function getConfigurations() {
				return configurations;
			}

			function set(key, value) {
				var index = configurations.findIndex(function (elem) {
					return elem.key === key;
				});

				if (index !== -1) {
					configurations[index].value = value;
					$rootScope.$emit('configurationChange');
				}
			}

			function get(key) {
				var index = configurations.findIndex(function (elem) {
					return elem.key === key;
				});

				if (index !== -1) {
					return configurations[index].value;
				} else {
					return null;
				}
			}
		}
	}
})();