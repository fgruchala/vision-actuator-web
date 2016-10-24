/**
 * Filter on package name 
 * @memberOf Filters
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('package', packageFilter);
    
    /**
     * @name packageFilter
     * @memberOf Filters
     */
    function packageFilter () {
        var filter = function(input) {
            var type = input;
            
            if(angular.isDefined(input)){   
                if(angular.isString(input)) {
                    
                }
                else {
                    throw new Error('Filter typeBeans : input has to be a String');
                }
            }
            
            return type;
        }
        
        return filter;
    }
    
})();