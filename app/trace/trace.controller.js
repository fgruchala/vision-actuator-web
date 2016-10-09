'use strict';

(function() {

	angular
	.module('app.trace')
	.controller('TraceController', TraceController);

	TraceController.$inject = ['tracePrepData'];

	function TraceController(tracePrepData) {
		var vm = this;

		vm.tracePrepData = tracePrepData;

		vm.colorFromStatus = colorFromStatus;




		function colorFromStatus(status) {
            if (status >= 500) {
                return 'status5xx';
            } else if (status >= 400) {
                return 'status4xx';
            } else {
                return 'status2xx';
            }
        }  
	}

})();