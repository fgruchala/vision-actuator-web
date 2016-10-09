/**
 * Card to show list data in multi lines
 * @namespace Components
 * @memberOf App
 * @example <v-multi-lines data-title="LANG.KEY" data-content="vm.items"></v-multi-lines>
 * @example <v-multi-lines data-title="LANG.KEY" data-content="vm.item"></v-multi-lines>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vMultiLines', multiLinesDirectiveDefinition);
    
    /**
     * @name multiLinesDirectiveDefinition
     * @desc Definition of the web component vMultiLines
     * @memberOf Components
     */
    function multiLinesDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/multi-lines/multi-lines.html',
            scope: {
                'title': '@',
                'contents': '='
            },
            controller: multiLinesDirectiveController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return definition;
    }
    
    multiLinesDirectiveController.$inject = ['$filter'];
    
    /**
     * @name multiLinesDirectiveController
     * @desc Controller of the web component vMultiLines
     * @param {@link https://docs.angularjs.org/api/ng/service/$filter | AngularService} [$filter]
     * @memberOf multiLinesDirectiveDefinition
     */
    function multiLinesDirectiveController ($filter) {
        var vm = this;
        
        vm.title;
        vm.contents;
        vm.size = $filter('size')(vm.contents); 
    }
    
})();