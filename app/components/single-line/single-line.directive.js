/**
 * Card to show one or more data in a single line
 * @namespace Components
 * @memberOf App
 * @example <v-single-line data-title="'LANG.KEY'" data-content="vm.items"></v-single-line>
 * @example <v-single-line data-title="'LANG.KEY'" data-content="vm.item"></v-single-line>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vSingleLine', singleLineDirectiveDefinition);
    
    /**
     * @name singleLineDirectiveDefinition
     * @desc Definition of the web component vSingleLine
     * @memberOf Components
     */
    function singleLineDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/single-line/single-line.html',
            scope: {
                'title': '@',
                'content': '='
            },
            controller: singleLineDirectiveController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return definition;
    }
    
    singleLineDirectiveController.$inject = ['$filter'];
    
    /**
     * @name singleLineDirectiveController
     * @desc Controller of the web component vSingleLine
     * @param {@link https://docs.angularjs.org/api/ng/service/$filter | AngularService} [$filter]
     * @memberOf singleLineDirectiveDefinition
     */
    function singleLineDirectiveController ($filter) {
        var vm = this;
        
        vm.title;
        vm.content;
        vm.size = $filter('size')(vm.content);
        
        vm.isString = isString;
        
        
        
        function isString () {
            return angular.isString(vm.content);
        } 
    }
    
})();