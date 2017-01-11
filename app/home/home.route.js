(function() {
	'use strict';

	angular
	.module('app.home')
	.config(homeConfig);

	homeConfig.$inject = ['$stateProvider'];

	function homeConfig($stateProvider) {

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl : 'app/home/home.html',
			controller : 'HomeController',
			controllerAs : 'vm',
			title: 'HOME.MODULE_NAME',
		});
	}
})();