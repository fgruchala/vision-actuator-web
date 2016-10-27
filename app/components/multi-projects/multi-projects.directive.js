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

    multiProjectsDirectiveController.$inject = ['$mdDialog', '$translate']
    
    /**
     * @name multiProjectsDirectiveController
     * @desc Controller of the web component vMultiProjects
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} [$mdDialog]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} [$translate]
     * @memberOf multiLinesDirectiveDefinition
     */
    function multiProjectsDirectiveController ($mdDialog, $translate) {
        var vm = this;
        var projects = [
            {
                url: 'http://localhost:9090',
                name: 'Local'
            }
        ];
        var newProject; 

        vm.searchText;

        vm.selectProject = selectProject;
        vm.searchProject = searchProject;
        vm.saveProject = saveProject;

        init();



        function init () {
            newProject = undefined;
            vm.searchText = '';
            // todo projects = dans localStorage
        }

        function selectProject (project) {
            if(angular.isDefined(project)) {
                console.log(project);
            }
        }

        function searchProject () {
            var filteredProjects = [];
            var searchText = '';

            if(angular.isDefined(vm.searchText) && vm.searchText != ''){
                searchText = vm.searchText.toLowerCase();

                angular.forEach(projects, function(project, idx) {
                    var projectName = project.name.toLowerCase();
                    var projectUrl = project.url.toLowerCase();

                    if(projectName.indexOf(searchText) === 0 || projectUrl.indexOf(searchText) === 0){
                        filteredProjects.push(project);
                    }
                });
            }
            else {
                filteredProjects = projects;
            }

            return filteredProjects;
        }

        function saveProject () {
            var regexUrl = /^https?/;

            if(regexUrl.test(vm.searchText)) {
                saveProjectByUrl();
            }
            else {
                saveProjectByName();
            }
        }

        function saveProjectByUrl () {
            newProject = {
                url: angular.copy(vm.searchText)
            };

            $translate(['MULTI_PROJECTS.NEW', 'MULTI_PROJECTS.NAME.LABEL', 'MULTI_PROJECTS.NAME.PLACEHOLDER', 'COMMON.OK', 'COMMON.CANCEL'])
                .then(function(translations) {
                    $mdDialog.show(
                        $mdDialog.prompt()
                        .clickOutsideToClose(true)
                        .title(translations['MULTI_PROJECTS.NEW'])
                        .textContent(translations['MULTI_PROJECTS.NAME.LABEL'] + ' ' + newProject.url)
                        .placeholder(translations['MULTI_PROJECTS.NAME.PLACEHOLDER'])
                        .ariaLabel('Name')
                        .ok(translations['COMMON.OK'])
                        .cancel(translations['COMMON.CANCEL'])
                    )
                    .then(function(name) {
                        newProject.name = name;
                        saveProjectInLocalStorage();
                    },
                    function() {
                        init();
                    });
                });
        }

        function saveProjectByName () {
            newProject = {
                name: angular.copy(vm.searchText)
            };

            $translate(['MULTI_PROJECTS.NEW', 'MULTI_PROJECTS.URL.LABEL', 'MULTI_PROJECTS.URL.PLACEHOLDER', 'COMMON.OK', 'COMMON.CANCEL'])
                .then(function(translations) {
                    $mdDialog.show(
                        $mdDialog.prompt()
                        .clickOutsideToClose(true)
                        .title(translations['MULTI_PROJECTS.NEW'])
                        .textContent(translations['MULTI_PROJECTS.URL.LABEL'] + ' ' + newProject.name)
                        .placeholder(translations['MULTI_PROJECTS.URL.PLACEHOLDER'])
                        .ariaLabel('URL')
                        .ok(translations['COMMON.OK'])
                        .cancel(translations['COMMON.CANCEL'])
                    )
                    .then(function(url) {
                        newProject.url = url;
                        saveProjectInLocalStorage();
                    },
                    function() {
                        init();
                    });
                });
        }

        function saveProjectInLocalStorage () {
            // LocalStaore
            selectProject(newProject);
        }   
    }
})();