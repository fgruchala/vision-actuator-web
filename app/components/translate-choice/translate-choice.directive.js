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
    
    translateChoiceDirectiveController.$inject = ['$translate', '$mdMenu', '$mdToast'];
    
    /**
     * @name translateChoiceDirectiveController
     * @desc Controller of the web component vTranslateChoice
     * @see {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | $translate}
     * @see {@link https://material.angularjs.org/latest/api/directive/mdMenu | $mdMenu}
     * @see {@link https://material.angularjs.org/latest/api/service/$mdToast | $mdToast}
     */
    function translateChoiceDirectiveController ($translate, $mdMenu, $mdToast) {
        var vm = this;
        
        vm.actualLanguage;
        vm.availableLanguages = $translate.getAvailableLanguageKeys();
        
        vm.choice = choice;
        
        
        init();
        
        function init () {
            vm.actualLanguage = $translate.use();
        }
        
        function choice (language) {
            $mdMenu
            .hide()
            .then(function() {
                $translate('LANG.CHANGE_START_MESSAGE')
                .then(function(translation) {
                    var toastPromise = $mdToast.showSimple(translation);
                    
                    $translate
                    .use(language)
                    .then(function() {
                        $mdToast.hide(toastPromise);
                        init();
                    });
                });
            });
        }  
    }
    
})();