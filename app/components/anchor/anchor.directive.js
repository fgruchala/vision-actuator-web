/**
 * Web component to manage anchor
 * @namespace Components
 * @memberOf App
 * @example <ANY data-v-anchor="alice"></ANY>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vAnchor', anchorDirectiveDefinition);
    
    anchorDirectiveDefinition.$inject = ['$location', '$anchorScroll'];
    
    /**
     * @name anchorDirectiveDefinition
     * @desc Definition of the web component vAnchor
     * @param {@link https://docs.angularjs.org/api/ng/service/$location | AngularService} [$location]
     * @param {@link https://docs.angularjs.org/api/ng/service/$anchorScroll | AngularService} [$anchorScroll]
     * @memberOf Components
     */
    function anchorDirectiveDefinition ($location, $anchorScroll) {
        var definition = {
            restrict: 'A',
            link: anchorDirectiveLink
        };
        
        anchorDirectiveLink.$inject = ['$scope', '$element', '$attrs'];
        
        /**
         * @name anchorDirectiveLink
         * @desc Link function of the web component vAnchor
         * @param {@link https://docs.angularjs.org/guide/scope | AngularService} [$scope]
         * @param {Object} [$element]
         * @param {Object} [$attrs]
         * @memberOf anchorDirectiveDefinition
         */
        function anchorDirectiveLink ($scope, $element, $attrs) {
            var id;
            var content;
            
            init();
            modifyDOM();
            
            
            
            
            function init() {
                id = $attrs.vAnchor;
                content = $element.children();
                
                if(angular.isUndefined(id)) {
                    throw new Error('Directive vAnchor : need a String id.');
                }
            }
            
            function modifyDOM() {
                $element
                .empty()
                .removeClass('_md-no-proxy')
                .addClass('md-clickable')
                .addClass('_md-button-wrap')
                .append(
                    createContainer()
                    .append(createButton())
                    .append(createText()));
            }
            
            function createContainer() {
                var container = angular
                    .element('<div></div>')
                    .addClass('md-button')
                    .addClass('_md-no-style');
                    
                return container;
            }
            
            function createButton() {
                var button = angular
                    .element('<button></button>')
                    .attr('type', 'button')
                    .attr('aria-label', 'Go to anchor ' + id)
                    .attr('data-ng-transclude', '')
                    .addClass('_md-no-style')
                    .addClass('md-button')
                    .on('click', scrollToAnchor);
                    
                return button;
            }
            
            function createText() {
                var text = angular
                    .element('<div></div>')
                    .addClass('_md-list-item-inner')
                    .append(content);
                    
                return text;
            }
            
            function scrollToAnchor() {
                $location.hash(id);
                $anchorScroll();
            }
        }
        
        return definition;
    }
    
})();