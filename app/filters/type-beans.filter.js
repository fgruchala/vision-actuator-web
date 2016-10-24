/**
 * Filter on Bean type 
 * @memberOf Beans
 */
(function () {
    
    'use strict';
    
    angular
    .module('app.beans')
    .filter('typeBeans', typeBeansFilter);
    
    /**
     * @name typeBeansFilter
     * @memberOf Beans
     */
    function typeBeansFilter () {
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