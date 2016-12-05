/**
 * @example <v-no-result></v-no-result>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vNoResult', noResultDirectiveDefinition);
    
    function noResultDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            templateUrl: 'app/components/no-result/no-result.html',
            scope: {}
        };
        
        return definition;
    }
    
})();