(function() {
    'use strict';

    angular
        .module('app.services')
        .service('notificationService', notificationService);


    function notificationService () {
        var services = {
            notify: notify
        };

        function notify(title, body, url, icon) {
            if(!isGranted() && askForPermission() === 'denied') {
                return;
            }

            var notification = new Notification(title, { body: body });
            notification.onclick = function(event) {
                event.preventDefault();
                window.open(url, '_blank');
            };
        }

        return services;
    }

    function isGranted() {
        return Notification.permission === 'granted';
    }

    function askForPermission() {
        return Notification
            .requestPermission()
            .then(function(result) {
                return result;
            });
    }

})();