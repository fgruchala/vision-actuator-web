(function () {
    
    'use strict';
    
    angular
    .module('app.filters')
    .filter('method', methodFilter);
    
    methodFilter.$inject = ['$filter'];

    function methodFilter($filter) {
        var filter = function(input) {
            var result = '';
            
            if(angular.isDefined(input)){   
                if(angular.isString(input)) {
                    result = input
                        .split(' ')
                        .map(function(value) {
                            return $filter('package')(value);
                        })
                        .join(' ');
                }
                else {
                    throw new Error('Filter method : input has to be a String');
                }
            }
            
            return result;
        }
        
        return filter;
    }
    
})();