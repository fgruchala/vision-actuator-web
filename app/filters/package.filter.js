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
            var result = '';
            
            if(angular.isDefined(input)){   
                if(angular.isString(input)) {
                    var packages = input.split('.');
                    var className = packages.pop();

                    angular.forEach(packages, function(packageName, idx) {
                        result += packageName.substr(0, 1) + '.';
                    });

                    result += className;
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