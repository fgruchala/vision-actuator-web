(function() {
    'use strict';

    angular
    .module('app.mappings')
    .controller('MappingsController', mappingsController);

    mappingsController.$inject = ['mappingsPrepData'];

    function mappingsController(mappingsPrepData) {
        var vm = this;

        vm.mappingsPrepData = mappingsPrepData;
    }

})();