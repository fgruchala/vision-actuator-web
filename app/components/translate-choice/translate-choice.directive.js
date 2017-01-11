/**
 * @example <v-translate-choice></v-translate-choice>
 */
(function () {
    'use strict';
    
    angular
    .module('app.components')
    .directive('vTranslateChoice', translateChoiceDirectiveDefinition);
    
    function translateChoiceDirectiveDefinition () {
        var definition = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/translate-choice/translate-choice.html',
            controller: translateChoiceDirectiveController,
            controllerAs: 'vm'
        };
        
        return definition;
    }
    
    translateChoiceDirectiveController.$inject = ['$translate', '$mdMenu', '$mdToast'];
    
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