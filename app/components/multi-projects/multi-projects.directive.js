/**
 * Input to manage multi-urls projects
 * @namespace Components
 * @memberOf App
 * @example <v-multi-projects></v-multi-projects>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vMultiProjects', multiProjectsDirectiveDefinition);
    
    /**
     * @name multiProjectsDirectiveDefinition
     * @desc Definition of the web component vMultiProjects
     * @memberOf Components
     */
    function multiProjectsDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/multi-projects/multi-projects.html',
            scope: {},
            controller: multiProjectsDirectiveController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return definition;
    }
    
    /**
     * @name multiProjectsDirectiveController
     * @desc Controller of the web component vMultiProjects
     * @memberOf multiLinesDirectiveDefinition
     */
    function multiProjectsDirectiveController () {
        var vm = this;
    }
    
})();