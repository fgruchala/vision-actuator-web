/**
 * Web component to fixed a block
 * @namespace Components
 * @memberOf App
 * @example <ANY data-v-scroll-fixed></ANY>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vScrollFixed', scrollFixedDirectiveDefinition);
    
    scrollFixedDirectiveDefinition.$inject = ['$document', '$window'];
    
    /**
     * @name scrollFixedDirectiveDefinition
     * @desc Definition of the web component vScrollFixed
     * @param {@link https://docs.angularjs.org/api/ng/service/$document | AngularService} [$document]
     * @param {@link https://docs.angularjs.org/api/ng/service/$window | AngularService} [$window]
     * @memberOf Components
     */
    function scrollFixedDirectiveDefinition ($document, $window) {
        var definition = {
            restrict: 'A',
            link: scrollFixedDirectiveLink
        };
        
        scrollFixedDirectiveLink.$inject = ['$scope', '$element', '$attrs'];
        
        /**
         * @name scrollFixedDirectiveLink
         * @desc Link function of the web component vScrollFixed
         * @param {@link https://docs.angularjs.org/guide/scope | AngularService} [$scope]
         * @param {Object} [$element]
         * @param {Object} [$attrs]
         * @memberOf scrollFixedDirectiveDefinition
         */
        function scrollFixedDirectiveLink ($scope, $element, $attrs) {
            var level = $element[0].getBoundingClientRect().top;
            
            
            
            $document.on('scroll', fixedOrNot);
            
            function fixedOrNot() {
                if($window.scrollY > level) {
                    $element
                    .css('position', 'fixed')
                    .css('top', 0);
                }
                else{
                    $element
                    .css('position', '')
                    .css('top', 'auto');
                }
            }
        }
        
        return definition;
    }
    
})();