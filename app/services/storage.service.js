/**
 * Service to store content in the browser
 * @namespace Services
 * @memberOf App
 */
(function() {
    'use strict';

    angular
        .module('app.services')
        .service('storageService', storageService);


    /**
     * @name storageService
     * @return {Object}
     * @memberOf Services
     */
    function storageService () {
        return {
            setItem: function(key, item) {
                localStorage[key] = angular.toJson(item, false);
            },
            getItem: function(key) {
                if(angular.isDefined(localStorage[key])){
                	return angular.fromJson(localStorage[key]);
                }

                return undefined;
            },
            removeItem: function(key) {
                if(angular.isDefined(localStorage[key])){
                    delete localStorage[key];
                    return true;
                }

                return false;
            }
        };
    }
})();