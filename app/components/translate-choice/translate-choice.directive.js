/**
 * Web component to give the choice of the language
 * @namespace Components
 * @memberOf App
 * @example <v-translate-choice></v-translate-choice>
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.components')
    .directive('vTranslateChoice', translateChoiceDirectiveDefinition);
    
    /**
     * @name translateChoiceDirectiveDefinition
     * @desc Definition of the web component vTranslateChoice
     */
    function translateChoiceDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            templateUrl: 'app/components/translate-choice/translate-choice.html',
            controller: translateChoiceDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    translateChoiceDirectiveController.$inject = ['$translate'];
    
    /**
     * @name translateChoiceDirectiveController
     * @desc Controller of the web component vTranslateChoice
     * @see {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | $translate}
     */
    function translateChoiceDirectiveController ($translate) {
        var vm = this;
        
        vm.actualLanguage;
        vm.availableLanguages = $translate.getAvailableLanguageKeys();
        
        vm.choice = choice;
        
        
        init();
        
        function init () {
            vm.actualLanguage = $translate.use();
        }
        
        function choice (language) {
            $translate
            .use(language)
            .then(init);
        }  
    }
    
})();