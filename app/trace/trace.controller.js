'use strict';

(function() {

	angular
	.module('app.trace')
	.controller('TraceController', TraceController);

	TraceController.$inject = ['tracePrepData'];

	function TraceController(tracePrepData) {
		var vm = this;

		vm.tracePrepData = tracePrepData;
	}

})();