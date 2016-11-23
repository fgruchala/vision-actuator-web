(function() {
    'use strict';

    angular
    .module('app.mappings')
    .controller('MappingsController', mappingsController);

    mappingsController.$inject = ['mappingsPrepData'];

    function mappingsController(mappingsPrepData) {
        var vm = this;

        vm.mappingsPrepData = mappingsPrepData;
        vm.tagsPrepData = ['GET', 'POST', 'application/json', '/**'];
        vm.selectedTags = [];

        vm.select = select;

        function select(tag) {
            console.log(tag);
        }
    }

})();