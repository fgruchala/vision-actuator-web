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

    multiProjectsDirectiveController.$inject = ['$mdDialog', '$translate', 'storageService', 'actuatorService'];
    
    /**
     * @name multiProjectsDirectiveController
     * @desc Controller of the web component vMultiProjects
     * @param {@link https://material.angularjs.org/latest/api/service/$mdDialog | MaterialService} [$mdDialog]
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} [$translate]
     * @param {Service} [storageService]
     * @param {Service} [actuatorService]
     * @memberOf multiProjectsDirectiveDefinition
     */
    function multiProjectsDirectiveController ($mdDialog, $translate, storageService, actuatorService) {
        var vm = this;
        var projects;
        var newProject; 

        vm.searchText;
        vm.selectedProject;

        vm.selectProject = selectProject;
        vm.searchProject = searchProject;
        vm.saveProject = saveProject;
        vm.isDisabled = isDisabled;

        init();



        function init () {
            newProject = {};
            projects = [];
            vm.searchText = '';

            if(angular.isDefined(storageService.getItem('projects'))) {
                projects = storageService.getItem('projects');
                vm.selectedProject = projects[0];
            }
            else{
                vm.selectedProject = {
                    name: 'Localhost',
                    url: actuatorService.getServiceUrl()
                };
            }
        }

        function selectProject (project) {
            if(angular.isDefined(project)) {
                vm.selectedProject = project;
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

        function saveProjectFromSearch () {    
            var regexUrl = /^https?/;

            if(regexUrl.test(vm.searchText)) {
                newProject.url = angular.copy(vm.searchText);
            }
            else {
                newProject.name = angular.copy(vm.searchText);
            }

            saveProject();
        }

        function saveProject () {
            $mdDialog.show({
                controller: 'SaveProjectPopupController',
                controllerAs: 'vm',
                templateUrl: 'app/components/multi-projects/save-project-popup.html',
                clickOutsideToClose: true,
                locals: {
                    projectPrepData: newProject
                }
            })
            .then(saveProjectInLocalStorage, init);

            // $translate(['MULTI_PROJECTS.NEW', 'MULTI_PROJECTS.NAME.LABEL', 'MULTI_PROJECTS.NAME.PLACEHOLDER', 'COMMON.OK', 'COMMON.CANCEL'])
            //     .then(function(translations) {
            //         $mdDialog.show(
            //             $mdDialog.prompt()
            //             .clickOutsideToClose(true)
            //             .title(translations['MULTI_PROJECTS.NEW'])
            //             .textContent(translations['MULTI_PROJECTS.NAME.LABEL'] + ' ' + newProject.url)
            //             .placeholder(translations['MULTI_PROJECTS.NAME.PLACEHOLDER'])
            //             .ariaLabel('Name')
            //             .ok(translations['COMMON.OK'])
            //             .cancel(translations['COMMON.CANCEL'])
            //         )
            //         .then(function(project) {
            //             newProject = project;
            //             saveProjectInLocalStorage();
            //         },
            //         function() {
            //             init();
            //         });
            //     });
        }

        function isDisabled () {
            return angular.isUndefined(projects) || projects.length === 0;
        }

        function saveProjectInLocalStorage (project) {
            projects.push(project);

            storageService.setItem('projects', projects);
            selectProject(project);
        }   
    }
})();