/**
 * Object Size 
 * @namespace Filters
 * @memberOf App
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('size', sizeFilter);
    
    /**
     * @name sizeFilter
     * @memberOf Filters
     */
    function sizeFilter () {
        var filter = function(input) {
            var size = 0;
            
            if(angular.isDefined(input)){   
                if(angular.isArray(input)) {
                    size = input.length;
                }
                else if(angular.isObject(input)) {
                    angular.forEach(input, function(value, key) {
                    size++; 
                    });
                }
                else {
                    throw new Error('Filter size : input has to be an array or an object');
                }
            }
            
            return size;
        }
        
        return filter;
    }
    
})();