(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('package', packageFilter);
    
    function packageFilter () {
        var filter = function(input) {
            var result = '';
            
            if(angular.isDefined(input)){   
                if(angular.isString(input)) {
                    result = input.replace(/[a-z]*\./g, function(match) {
                        return match.charAt(0) + '.';
                    });
                }
                else {
                    throw new Error('Filter package : input has to be a String');
                }
            }
            
            return result;
        }
        
        return filter;
    }
    
})();