/**
 * Volume Data 
 * @namespace Filters
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('volumeData', volumeDataFilter);
    
    volumeDataFilter.$inject = ['$translate'];
    
    /**
     * @name volumeDataFilter
     * @param {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate | TranslateService} $translate
     * @memberOf Filters
     */
    function volumeDataFilter ($translate) {
        var filter = function(input) {
            var volumeData = 0;
            var unit = 0;
            
            if(angular.isNumber(input)) {
                volumeData = input;
                
                while(volumeData != (volumeData%1024)) {
                    volumeData = volumeData/1024;
                    unit++;
                }
                
                volumeData = volumeData.toFixed(2);     
            }
            else {
                throw new Error('Filter volumeData : input has to be a number');
            }
            
            return volumeData + " " + $translate.instant('VOLUME-DATA', {'UNIT':unit});
        }
        
        return filter;
    }
    
})();