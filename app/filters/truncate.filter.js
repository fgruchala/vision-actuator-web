(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('truncate', truncateFilter);
    
    function truncateFilter () {
        var filter = function(input, size) {
            var result = input;
            
            if(angular.isDefined(input)){   
                if(angular.isString(input)) {
                    if(angular.isDefined(size)) {
                        if(input.length>size) {
                            result = input.substr(0, size) + ' ...';
                        }
                    }
                }
                else {
                    throw new Error('Filter truncate : input has to be a String');
                }
            }
            
            return result;
        }
        
        return filter;
    }
    
})();