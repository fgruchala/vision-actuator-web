/**
 * Filter to capitalize a String 
 * @memberOf Filters
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('capitalize', capitalizeFilter);
    
    /**
     * @name capitalizeFilter
     * @memberOf Filters
     */
    function capitalizeFilter () {
        var filter = function(input) {
            var result = '';
            
            if(angular.isDefined(input)){   
                if(angular.isString(input)) {
                    result = input.substr(0, 1).toUpperCase() + input.substr(1).toLowerCase();
                }
                else {
                    throw new Error('Filter capitalize : input has to be a String');
                }
            }
            
            return result;
        }
        
        return filter;
    }
    
})();