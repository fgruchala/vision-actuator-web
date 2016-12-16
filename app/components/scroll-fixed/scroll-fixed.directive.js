/**
 * @example <ANY data-v-scroll-fixed></ANY>
 * @example <ANY data-v-scroll-fixed="136"></ANY>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vScrollFixed', scrollFixedDirectiveDefinition);
    
    scrollFixedDirectiveDefinition.$inject = ['$document', '$window'];
    
    function scrollFixedDirectiveDefinition ($document, $window) {
        var definition = {
            restrict: 'A',
            link: scrollFixedDirectiveLink
        };
        
        scrollFixedDirectiveLink.$inject = ['$scope', '$element', '$attrs'];
        
        function scrollFixedDirectiveLink ($scope, $element, $attrs) {
            var level = ($attrs['vScrollFixed'] && angular.isNumber($attrs['vScrollFixed'])) ? $attrs['vScrollFixed'] : $element[0].getBoundingClientRect().top;
        
            $document.on('scroll', fixedOrNot);
            
            function fixedOrNot() {
                if($window.scrollY > level) {
                    $element
                    .css('position', 'fixed')
                    .css('top', '0');
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